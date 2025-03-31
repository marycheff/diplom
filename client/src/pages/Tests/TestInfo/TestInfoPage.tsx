import TestForm from "@/components/shared/TestForm"
import Loader from "@/components/ui/Loader/Loader"
import { useAuthStore } from "@/store/useAuthStore"
import { useTestStore } from "@/store/useTestStore"
import { PreTestUserDataLabels } from "@/types/inputFields"
import { TestDTO } from "@/types/testTypes"
import { formatSeconds } from "@/utils/formatter"
import { isValidObjectId } from "@/utils/validator"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styles from "./TestInfoPage.module.scss"

const TestInfoPage = () => {
    const { testId } = useParams<{ testId: string }>()
    const { getTestById, isFetching } = useTestStore()
    const [test, setTest] = useState<TestDTO | null>(null)
    const { user: currentUser } = useAuthStore()

    if (!testId) {
        return <div>ID теста не указан</div>
    }
    if (!isValidObjectId(testId)) {
        return <div>Невалидный Id</div>
    }

    const fetchTest = async () => {
        const fetchedTest = await getTestById(testId)
        if (fetchedTest) {
            setTest(fetchedTest)
        }
    }
    useEffect(() => {
        fetchTest()
    }, [testId, getTestById])

    if (isFetching) {
        return <Loader fullScreen />
    }
    if (!test) {
        return <div>Тест не найден</div>
    }
    return (
        <div className={styles.container}>
            {/* <div className={styles.navigation}>
                <BackButton />
                <HomeButton />
            </div> */}

            <div className={styles.topGrid}>
                {/* Block 1: Basic Test Information */}
                <div className={styles.infoBlock}>
                    <h1 className={styles.blockTitle}>Информация о тесте</h1>
                    <div className={styles.blockContent}>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>ID:</span>
                            <span className={styles.value}>{test.id}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Название:</span>
                            <span className={styles.value}>
                                {test.title || <span className={styles.emptyField}>не указано</span>}
                            </span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Описание:</span>
                            <span className={styles.value}>
                                {test.description || <span className={styles.emptyField}>не указано</span>}
                            </span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Всего попыток:</span>
                            <span className={styles.value}>
                                {test.totalAttempts === 0 ? (
                                    "0"
                                ) : (
                                    <Link to={`/admin/tests/${test.id}/attempts`} className="actionLink">
                                        {test.totalAttempts}
                                    </Link>
                                )}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Block 2: Test Settings */}
                <div className={styles.infoBlock}>
                    <h1 className={styles.blockTitle}>Настройки теста</h1>
                    <div className={styles.blockContent}>
                        {test.settings ? (
                            <>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Требуется регистрация:</span>
                                    <span className={styles.value}>
                                        {test.settings.requireRegistration ? "Да" : "Нет"}
                                    </span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Показывать детальные результаты:</span>
                                    <span className={styles.value}>
                                        {test.settings.showDetailedResults ? "Да" : "Нет"}
                                    </span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Поля ввода:</span>
                                    <span className={styles.value}>
                                        {test.settings.inputFields && test.settings.inputFields.length > 0 ? (
                                            test.settings.inputFields
                                                .map(field => PreTestUserDataLabels[field] || field)
                                                .join(", ")
                                        ) : (
                                            <span className={styles.emptyField}>не указаны</span>
                                        )}
                                    </span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Обязательные поля:</span>
                                    <span className={styles.value}>
                                        {test.settings.requiredFields && test.settings.requiredFields.length > 0 ? (
                                            test.settings.requiredFields
                                                .map(field => PreTestUserDataLabels[field] || field)
                                                .join(", ")
                                        ) : (
                                            <span className={styles.emptyField}>не указаны</span>
                                        )}
                                    </span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Лимит времени:</span>
                                    <span className={styles.value}>
                                        {test.settings.timeLimit ? (
                                            formatSeconds(test.settings.timeLimit)
                                        ) : (
                                            <span className={styles.emptyField}>не указан</span>
                                        )}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div className={styles.emptyBlock}>Настройки теста не определены</div>
                        )}
                    </div>
                </div>
                {/* Block 3: Author Information */}
                {test.author.id !== currentUser?.id && (
                    <div className={styles.infoBlock}>
                        <h1 className={styles.blockTitle}>Информация об авторе</h1>
                        <div className={styles.blockContent}>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>ID:</span>
                                <span className={styles.value}>
                                    <Link to={`/admin/users/${test.author.id}`} className="actionLink">
                                        {test.author.id}
                                    </Link>
                                </span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Email:</span>
                                <span className={styles.value}>
                                    {test.author.email || <span className={styles.emptyField}>не указан</span>}
                                </span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Имя:</span>
                                <span className={styles.value}>
                                    {test.author.name || <span className={styles.emptyField}>не указано</span>}
                                </span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Фамилия:</span>
                                <span className={styles.value}>
                                    {test.author.surname || <span className={styles.emptyField}>не указана</span>}
                                </span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Отчество:</span>
                                <span className={styles.value}>
                                    {test.author.patronymic || <span className={styles.emptyField}>не указано</span>}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.infoBlock}>
                <h1 className={styles.blockTitle}>Вопросы и ответы</h1>
                <div className={styles.blockContent}>
                    {test.questions && test.questions.length > 0 ? (
                        <div className={styles.questionsList}>
                            {test.questions.map((question, index) => (
                                <div key={question.id} className={styles.questionBlock}>
                                    <div className={styles.questionHeader}>
                                        <span className={styles.questionNumber}>{index + 1}</span>
                                        <span className={styles.questionText}>{question.text}</span>
                                        <span className={styles.questionType}>Тип: {question.type}</span>
                                    </div>
                                    <div className={styles.answersList}>
                                        {question.answers.map(answer => (
                                            <div
                                                key={answer.id}
                                                className={`${styles.answerItem} ${
                                                    answer.isCorrect ? styles.correctAnswer : ""
                                                }`}>
                                                <span className={styles.answerText}>{answer.text}</span>
                                                {answer.isCorrect && (
                                                    <span className={styles.correctBadge}>Правильный</span>
                                                )}
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
            <div className="createTestBlock">
                <TestForm />
            </div>
        </div>
    )
}

export default TestInfoPage
