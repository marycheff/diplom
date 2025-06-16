import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { useTestStore } from "@/features/tests/store/useTestStore"
import ImageWithFallback from "@/shared/components/ImageWithFallback/ImageWithFallback"
import NothingFound from "@/shared/components/NotFound/NothingFound"
import { ModerationStatusLabels, PreTestUserDataLabels, QuestionTypeLabels, TestSnapshotDTO } from "@/shared/types"
import Loader from "@/shared/ui/Loader/Loader"
import { getImageUrl } from "@/shared/utils"
import { formatSeconds } from "@/shared/utils/formatter"
import { isValidUUID } from "@/shared/utils/validator"
import { FC, useEffect, useState } from "react"
import styles from "./Snapshot.module.scss"

interface SnapshotProps {
	snapshotId: string
}

const Snapshot: FC<SnapshotProps> = ({ snapshotId }) => {
	const { getSnapshotById, isFetching } = useTestStore()
	const [snapshot, setSnapshot] = useState<TestSnapshotDTO | null>(null)
	const { isAdmin } = useAuthStore()

	if (!snapshotId) {
		return <NothingFound title="ID снимка теста не указан" />
	}
	if (!isValidUUID(snapshotId)) {
		return <NothingFound title="Невалидный ID снимка теста" />
	}
	const fetchSnapshot = async () => {
		const fetchedSnapshot = await getSnapshotById(snapshotId)
		if (fetchedSnapshot) {
			setSnapshot(fetchedSnapshot.snapshot)
		}
	}
	useEffect(() => {
		fetchSnapshot()
	}, [snapshotId, getSnapshotById])

	if (isFetching) {
		return <Loader centeredInParent />
	}

	if (!snapshot) {
		return <NothingFound title="Снимок теста не найден" />
	}

	return (
		<div className={styles.container}>
			{snapshot.image && (
				<div className={styles.testImage}>
					<ImageWithFallback
						src={getImageUrl(snapshot.image)}
						alt="изображение не загрузилось"
					/>
				</div>
			)}
			<div className={styles.topGrid}>
				<div className={styles.infoBlock}>
					<h1 className={styles.blockTitle}>Информация о тесте</h1>
					<div className={styles.blockContent}>
						<div className={styles.infoRow}>
							<span className={styles.label}>Название</span>
							<span className={styles.value}>
								{snapshot.title || <span className={styles.emptyField}>не указано</span>}
							</span>
						</div>
						<div className={styles.infoRow}>
							<span className={styles.label}>Описание</span>
							<span className={styles.value}>
								{snapshot.description || <span className={styles.emptyField}>не указано</span>}
							</span>
						</div>
						{isAdmin && (
							<div className={styles.infoRow}>
								<span className={styles.label}>Статус модерации</span>
								<span className={styles.value}>{ModerationStatusLabels[snapshot.status]}</span>
							</div>
						)}
					</div>
				</div>
				<div className={styles.infoBlock}>
					<div className={styles.blockHeader}>
						<h1 className={styles.blockTitle}>Настройки теста</h1>
					</div>

					<div className={styles.blockContent}>
						{snapshot.settings ? (
							<>
								<>
									<div className={styles.infoRow}>
										<span className={styles.label}>Требуется регистрация</span>
										<span className={styles.value}>{snapshot.settings.requireRegistration ? "Да" : "Нет"}</span>
									</div>
									<div className={styles.infoRow}>
										<span className={styles.label}>Показывать детальные результаты</span>
										<span className={styles.value}>{snapshot.settings.showDetailedResults ? "Да" : "Нет"}</span>
									</div>
									<div className={styles.infoRow}>
										<span className={styles.label}>Перемешивать вопросы</span>
										<span className={styles.value}>{snapshot.settings.shuffleQuestions ? "Да" : "Нет"}</span>
									</div>
									<div className={styles.infoRow}>
										<span className={styles.label}>Перемешивать варианты ответов</span>
										<span className={styles.value}>{snapshot.settings.shuffleAnswers ? "Да" : "Нет"}</span>
									</div>
									<div className={styles.infoRow}>
										<span className={styles.label}>Разрешить повторное прохождение</span>
										<span className={styles.value}>{snapshot.settings.allowRetake ? "Да" : "Нет"}</span>
									</div>

									<div className={styles.infoRow}>
										<span className={styles.label}>Лимит повторного прохождения</span>
										<span className={styles.value}>
											{snapshot.settings.retakeLimit || <span className={styles.emptyField}>не указан</span>}
										</span>
									</div>
									<div className={styles.infoRow}>
										<span className={styles.label}>Поля ввода</span>
										<span className={styles.value}>
											{snapshot.settings.inputFields && snapshot.settings.inputFields.length > 0 ? (
												snapshot.settings.inputFields.map((field) => PreTestUserDataLabels[field] || field).join(", ")
											) : (
												<span className={styles.emptyField}>не указаны</span>
											)}
										</span>
									</div>
									<div className={styles.infoRow}>
										<span className={styles.label}>Лимит времени</span>
										<span className={styles.value}>
											{snapshot.settings.timeLimit ? (
												formatSeconds(snapshot.settings.timeLimit)
											) : (
												<span className={styles.emptyField}>не указан</span>
											)}
										</span>
									</div>
								</>
							</>
						) : (
							<div className={styles.emptyBlock}>Настройки теста не определены</div>
						)}
					</div>
				</div>
			</div>

			<div className={styles.infoBlock}>
				{snapshot.questions?.length && snapshot.questions?.length > 0 ? (
					<h1 className={styles.blockTitle}>Вопросы и ответы ({snapshot.questions.length})</h1>
				) : (
					<h1 className={styles.blockTitle}>Вопросы и ответы</h1>
				)}
				<div className={styles.blockContent}>
					{snapshot.questions.length > 0 ? (
						<div className={styles.questionsList}>
							{snapshot.questions.map((question, index) => (
								<div
									key={question.id}
									className={styles.questionBlock}
								>
									<div className={styles.questionHeader}>
										<span className={styles.questionNumber}>{index + 1}</span>
										<span className={styles.questionText}>{question.text}</span>
										<span className={styles.questionType}>{QuestionTypeLabels[question.type]}</span>
									</div>
									<div className={styles.answersList}>
										{question.image && (
											<div className={styles.questionImage}>
												<ImageWithFallback
													src={getImageUrl(question.image)}
													alt="Изображение не загрузилось. Возможно, оно было удалено"
												/>
											</div>
										)}
										{question.answers.map((answer) => (
											<div
												key={answer.id}
												className={`${styles.answerItem} ${answer.isCorrect ? styles.correctAnswer : ""}`}
											>
												<span className={styles.answerText}>{answer.text}</span>
												{answer.isCorrect && <span className={styles.correctBadge}>Правильный</span>}
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					) : (
						<div className={styles.emptyBlock}>Вопросы отсутствуют</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Snapshot
