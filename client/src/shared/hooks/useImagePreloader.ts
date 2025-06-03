import { UserQuestionDTO } from "@/shared/types"
import { getImageUrl } from "@/shared/utils"
import { useCallback, useEffect, useRef } from "react"

interface UseImagePreloaderOptions {
	questions: UserQuestionDTO[]
	currentPage: number
	preloadRadius?: number
	priority?: boolean
}

interface ImageLoadResult {
	success: boolean
	src: string
	error?: Error
}

// Типизированный интерфейс для HTMLImageElement с fetchPriority
interface ImageElementWithPriority extends HTMLImageElement {
	fetchPriority: "high" | "low" | "auto"
}

export const useImagePreloader = ({
	questions,
	currentPage,
	preloadRadius = 2,
	priority = false,
}: UseImagePreloaderOptions) => {
	const preloadedImages = useRef<Set<string>>(new Set())
	const loadingImages = useRef<Map<string, HTMLImageElement>>(new Map())
	const failedImages = useRef<Set<string>>(new Set())

	const preloadImage = useCallback(
		(src: string): Promise<ImageLoadResult> => {
			return new Promise((resolve) => {
				// Проверяем, не загружен ли уже
				if (preloadedImages.current.has(src)) {
					resolve({ success: true, src })
					return
				}

				// Проверяем, не провалился ли уже
				if (failedImages.current.has(src)) {
					resolve({ success: false, src, error: new Error("Ранее не удалось загрузить изображение") })
					return
				}

				// Проверяем, не загружается ли уже
				if (loadingImages.current.has(src)) {
					const existingImg = loadingImages.current.get(src)!
					existingImg.addEventListener("load", () => resolve({ success: true, src }))
					existingImg.addEventListener("error", () =>
						resolve({
							success: false,
							src,
							error: new Error(`Не удалось загрузить изображение: ${src}`),
						})
					)
					return
				}

				const img = new Image()
				loadingImages.current.set(src, img)

				img.onload = () => {
					preloadedImages.current.add(src)
					loadingImages.current.delete(src)
					resolve({ success: true, src })
				}

				img.onerror = () => {
					failedImages.current.add(src)
					loadingImages.current.delete(src)
					resolve({
						success: false,
						src,
						error: new Error(`Не удалось загрузить изображение: ${src}`),
					})
				}

				// Установка приоритета загрузки с типизацией
				if (priority && "fetchPriority" in img) {
					;(img as ImageElementWithPriority).fetchPriority = "high"
				}

				img.src = src
			})
		},
		[priority]
	)

	const getValidImageUrls = useCallback((questionsRange: UserQuestionDTO[]): string[] => {
		const validUrls: string[] = []

		questionsRange.forEach((question) => {
			if (question?.image) {
				const imageUrl = getImageUrl(question.image)
				if (imageUrl && typeof imageUrl === "string") {
					validUrls.push(imageUrl)
				}
			}
		})

		return validUrls
	}, [])

	const preloadImagesInRange = useCallback(async () => {
		if (!questions.length) return

		const currentIndex = currentPage - 1
		const startIndex = Math.max(0, currentIndex - preloadRadius)
		const endIndex = Math.min(questions.length - 1, currentIndex + preloadRadius)

		const questionsInRange = questions.slice(startIndex, endIndex + 1)
		const imagesToPreload = getValidImageUrls(questionsInRange)

		// Фильтрация уже загруженных изображений
		const unloadedImages = imagesToPreload.filter(
			(src) => !preloadedImages.current.has(src) && !failedImages.current.has(src)
		)

		if (!unloadedImages.length) return

		// Сортировка по приоритету (ближайшие к текущему вопросу первыми)
		const sortedImages = unloadedImages
			.map((src) => {
				const questionIndex = questions.findIndex((q) => {
					const url = q.image ? getImageUrl(q.image) : null
					return url === src
				})
				const distance = Math.abs(questionIndex - currentIndex)
				return { src, distance, isHighPriority: distance <= 1 }
			})
			.sort((a, b) => a.distance - b.distance)

		// Загрузка с разными приоритетами
		const highPriorityImages = sortedImages.filter((img) => img.isHighPriority)
		const lowPriorityImages = sortedImages.filter((img) => !img.isHighPriority)

		// Сначала загрузка высокоприоритетных
		const highPriorityPromises = highPriorityImages.map(({ src }) => preloadImage(src).catch((result) => result))

		try {
			await Promise.allSettled(highPriorityPromises)
		} catch (error) {
			console.warn("Ошибка предзагрузки изображений высокого приоритета:", error)
		}

		// Затем низкоприоритетные с задержкой
		if (lowPriorityImages.length > 0) {
			setTimeout(() => {
				const lowPriorityPromises = lowPriorityImages.map(({ src }) => preloadImage(src).catch((result) => result))
				Promise.allSettled(lowPriorityPromises).catch((error) => {
					console.warn("Ошибка предзагрузки изображений низкого приоритета:", error)
				})
			}, 100) // Небольшая задержка для низкоприоритетных изображений
		}
	}, [questions, currentPage, preloadRadius, preloadImage, getValidImageUrls])

	// Предзагрузка при изменении текущей страницы
	useEffect(() => {
		preloadImagesInRange()
	}, [preloadImagesInRange])

	// Очистка неиспользуемых изображений из кэша
	const cleanupUnusedImages = useCallback(() => {
		const currentIndex = currentPage - 1
		const keepRadius = preloadRadius + 1

		// Очистка успешно загруженных изображений
		preloadedImages.current.forEach((src) => {
			const questionIndex = questions.findIndex((q) => {
				const url = q.image ? getImageUrl(q.image) : null
				return url === src
			})

			if (questionIndex === -1 || Math.abs(questionIndex - currentIndex) > keepRadius) {
				preloadedImages.current.delete(src)
			}
		})

		failedImages.current.forEach((src) => {
			const questionIndex = questions.findIndex((q) => {
				const url = q.image ? getImageUrl(q.image) : null
				return url === src
			})

			if (questionIndex === -1 || Math.abs(questionIndex - currentIndex) > keepRadius * 2) {
				failedImages.current.delete(src)
			}
		})
	}, [questions, currentPage, preloadRadius])

	// Периодическая очистка кэша
	useEffect(() => {
		const interval = setInterval(cleanupUnusedImages, 30000) // Каждые 30 секунд
		return () => clearInterval(interval)
	}, [cleanupUnusedImages])

	// Проверка предзагруженности с учетом типов
	const isImagePreloaded = useCallback((src: string | undefined): boolean => {
		if (!src || typeof src !== "string") return false
		return preloadedImages.current.has(src)
	}, [])

	// Получение URL изображения для конкретного вопроса
	const getQuestionImageUrl = useCallback((question: UserQuestionDTO): string | null => {
		if (!question.image) return null
		return getImageUrl(question.image) || null
	}, [])

	return {
		preloadImage,
		isImagePreloaded,
		getQuestionImageUrl,
		preloadedCount: preloadedImages.current.size,
		failedCount: failedImages.current.size,
		loadingCount: loadingImages.current.size,
	}
}
