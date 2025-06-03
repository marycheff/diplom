import { PreTestForm } from "@/features/attempts/components/PreTestForm/PreTestForm"
import { useAttemptStore } from "@/features/attempts/store/useAttemptStore"
import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { ROUTES } from "@/router/paths"
import Header from "@/shared/components/Header/Header"
import ImageWithFallback from "@/shared/components/ImageWithFallback/ImageWithFallback"
import TestNotFound from "@/shared/components/NotFound/TestNotFound"
import { PreTestUserDataType, UserTestDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Loader from "@/shared/ui/Loader/Loader"
import { getImageUrl } from "@/shared/utils"
import { isValidUUID } from "@/shared/utils/validator"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { generatePath, Link, useNavigate, useParams } from "react-router-dom"
import styles from "./StartAttemptPage.module.scss"

const StartAttemptPage = () => {
	const navigate = useNavigate()
	const { testId } = useParams<{ testId: string }>()
	const { isLoading, startAttempt } = useAttemptStore()
	const { isFetching, getBasicTestInfo } = useTestStore()
	const [test, setTest] = useState<UserTestDTO | null>(null)
	const { user } = useAuthStore()
	const [isDataLoaded, setIsDataLoaded] = useState(false)

	useEffect(() => {
		if (!testId) {
			toast.error("Id теста не указан")
			navigate("/", { replace: true })
			return
		}
		if (!isValidUUID(testId)) {
			toast.error("Невалидный Id теста")
			navigate("/", { replace: true })
			return
		}

		const fetchTest = async () => {
			try {
				const fetchedTest = await getBasicTestInfo(testId)
				if (fetchedTest) {
					setTest(fetchedTest)
				}
				setIsDataLoaded(true)
			} catch (error) {
				setIsDataLoaded(true)
				return <TestNotFound />
			}
		}
		fetchTest()
	}, [testId, getBasicTestInfo, navigate])

	if (isFetching || isLoading || !isDataLoaded) {
		return <Loader fullScreen />
	}
	if (!test && !isFetching) {
		return <TestNotFound />
	}
	if (test?.settings?.requireRegistration && !user) {
		const currentUrl = window.location.pathname
		return (
			<div className={styles.authBlock}>
				<h2>Тест требует авторизации.</h2>
				Пожалуйста, войдите или зарегистрируйтесь, чтобы пройти тест.
				<br />
				<br />
				<Link to={`${ROUTES.LOGIN}?returnUrl=${encodeURIComponent(currentUrl)}`}>Вход</Link>
				<Link to={`${ROUTES.REGISTER}?returnUrl=${encodeURIComponent(currentUrl)}`}>Регистрация</Link>
			</div>
		)
	}
	if (!test) {
		return <TestNotFound />
	}

	const handleStartAttempt = async (userData?: PreTestUserDataType) => {
		if (!testId) return

		const data = userData ? await startAttempt(testId, userData) : await startAttempt(testId)
		if (data && data.attemptId) {
			navigate(generatePath(ROUTES.PASS_ATTEMPT, { attemptId: data.attemptId }))
		} else {
			toast.error("Не удалось начать попытку. Попробуйте снова")
		}
	}

	const hasRequiredFields = test?.settings?.inputFields && test.settings.inputFields.length > 0

	return (
		<>
			<Header />
			<div className={styles.container}>
				{test.image && (
					<div className={styles.testImage}>
						<ImageWithFallback
							src={getImageUrl(test.image)}
							alt="изображение не загрузилось"
						/>
					</div>
				)}
				<div className={styles.blockContent}>
					<div className={styles.infoRow}>
						<span className={styles.label}>Название:</span>
						<span className={styles.value}>{test.title || <span className={styles.emptyField}>не указано</span>}</span>
					</div>
					<div className={styles.infoRow}>
						<span className={styles.label}>Описание:</span>
						<span className={styles.value}>
							{test.description || <span className={styles.emptyField}>не указано</span>}
						</span>
					</div>
				</div>
				{hasRequiredFields ? (
					<PreTestForm
						inputFields={test.settings?.inputFields!}
						onSubmit={handleStartAttempt}
						isLoading={isLoading}
					/>
				) : (
					<div>
						<Button onClick={() => handleStartAttempt()}>Начать попытку</Button>
					</div>
				)}
			</div>
		</>
	)
}

export default StartAttemptPage
