import { useAuthStore } from "@/features/auth/store/useAuthStore"
import QuestionCreator from "@/features/tests/components/QuestionCreator/QuestionCreator"
import TestInfoEditor from "@/features/tests/components/TestInfoEditor/TestInfoEditor"
import TestSettingsEditor from "@/features/tests/components/TestSettingsEditor/TestSettingsEditor"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { PreTestUserDataLabels } from "@/shared/types/inputFields"
import { QuestionDTO, ShortTestInfo, TestDTO, TestSettingsDTO, UpdateTestDTO } from "@/shared/types/testTypes"
import { Button } from "@/shared/ui/Button"
import Loader from "@/shared/ui/Loader/Loader"
import Modal from "@/shared/ui/Modal/Modal"
import { formatSeconds } from "@/shared/utils/formatter"
import { isValidObjectId } from "@/shared/utils/validator"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import styles from "./TestInfoPage.module.scss"

const TestInfoPage = () => {
    const { testId } = useParams<{ testId: string }>()
    const { getTestById, isFetching, updateTestQuestions, isLoading, updateTestSettings, updateShortInfo } =
        useTestStore()
    const [test, setTest] = useState<TestDTO | null>(null)
    const { user: currentUser } = useAuthStore()
    const navigate = useNavigate()
    const location = useLocation()
    const [isModalOpen, setIsModalOpen] = useState(location.pathname.endsWith("/add-questions"))
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(location.pathname.endsWith("/edit-settings"))
    const [isTestInfoModalOpen, setIsTestInfModalOpen] = useState(location.pathname.endsWith("/edit-info"))

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

    const handleQuestionsUpdate = async (newQuestions: QuestionDTO[]) => {
        if (!test) return

        const updatedTest = {
            ...test,
            questions: [...(test.questions || []), ...newQuestions],
        }

        const data: UpdateTestDTO = {
            questions: newQuestions,
        }
        await updateTestQuestions(test.id, data)
        toast.success("Вопрос(ы) добавлены")
        setTest(updatedTest)
    }
    const handleAddQuestionsButton = () => {
        navigate(`${location.pathname}/add-questions`)
        setIsModalOpen(true)
    }
    const handleEditSettingsButton = () => {
        // navigate(`${location.pathname}/edit-settings`)
        setIsSettingsModalOpen(true)
    }
    const handleEditTestInfoButton = () => {
        // navigate(`${location.pathname}/edit-settings`)
        setIsTestInfModalOpen(true)
    }
    const handleSettingsUpdate = async (updatedSettings: TestSettingsDTO) => {
        if (!test) return
        const updatedTest = {
            ...test,
            settings: updatedSettings,
        }
        await updateTestSettings(test.id, updatedSettings)
        toast.success("Настройки теста обновлены")
        setTest(updatedTest)
    }
    const handleShortInfoUpdate = async (updatedShortInfo: ShortTestInfo) => {
        const updatedTest = {
            ...test,
            title: updatedShortInfo.title,
            description: updatedShortInfo.description,
        }
        await updateShortInfo(testId, { title: updatedShortInfo.title, description: updatedShortInfo.description })
        toast.success("Информация о тесте обновлена")
        setTest(updatedTest)
    }

    return (
        <div className={styles.container}>
            <div className={styles.topGrid}>
                {/* Блок 1: Информация о тесте */}
                <div className={styles.infoBlock}>
                    <div className={styles.blockHeader}>
                        <h1 className={styles.blockTitle}>Информация о тесте</h1>
                        <div className={styles.buttonContainer}>
                            <Button onClick={handleEditTestInfoButton} className={styles.addQuestionBtn}>
                                ✏️
                            </Button>
                        </div>
                    </div>
                    {isLoading ? (
                        <Loader />
                    ) : (
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
                    )}
                </div>

                {/* Блок 2: Настройки теста */}
                <div className={styles.infoBlock}>
                    <div className={styles.blockHeader}>
                        <h1 className={styles.blockTitle}>Настройки теста</h1>
                        <div className={styles.buttonContainer}>
                            <Button onClick={handleEditSettingsButton} className={styles.addQuestionBtn}>
                                ✏️
                            </Button>
                        </div>
                    </div>

                    <div className={styles.blockContent}>
                        {test.settings ? (
                            <>
                                {isLoading ? (
                                    <Loader />
                                ) : (
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
                                                {test.settings.requiredFields &&
                                                test.settings.requiredFields.length > 0 ? (
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
                                )}
                            </>
                        ) : (
                            <div className={styles.emptyBlock}>Настройки теста не определены</div>
                        )}
                    </div>
                </div>

                {/* Блок 3: Информация об авторе */}
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

            {/* Блок 4: Информация о вопросах */}
            <div className={styles.infoBlock}>
                <div className={styles.blockHeader}>
                    <h1 className={styles.blockTitle}>Вопросы и ответы</h1>
                    <div className={styles.buttonContainer}>
                        <Button onClick={handleAddQuestionsButton} className={styles.addQuestionBtn}>
                            ✏️
                        </Button>
                    </div>
                </div>
                {isLoading ? (
                    <Loader />
                ) : (
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
                )}
            </div>

            <Modal
                fullScreen
                isOpen={isModalOpen}
                onClose={() => {
                    navigate(-1)
                    setIsModalOpen(false)
                }}
                title="Добавление вопросов">
                <QuestionCreator
                    onQuestionComplete={questions => {
                        handleQuestionsUpdate(questions)
                        setIsModalOpen(false)
                    }}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>

            <Modal
                fullScreen
                isOpen={isSettingsModalOpen}
                onClose={() => {
                    // navigate(-1)
                    setIsSettingsModalOpen(false)
                }}
                title="Редактирование настроек теста">
                <TestSettingsEditor
                    settings={test.settings || {}}
                    onSettingsComplete={settings => {
                        handleSettingsUpdate(settings)
                        setIsSettingsModalOpen(false)
                    }}
                    onCancel={() => setIsSettingsModalOpen(false)}
                />
            </Modal>
            <Modal
                isOpen={isTestInfoModalOpen}
                onClose={() => {
                    // navigate(-1)
                    setIsTestInfModalOpen(false)
                }}
                title="Редактирование информации о тесте">
                <TestInfoEditor
                    data={{ title: test.title, description: test.description }}
                    onSettingsComplete={data => {
                        handleShortInfoUpdate(data)
                        setIsTestInfModalOpen(false)
                    }}
                    onCancel={() => setIsSettingsModalOpen(false)}
                />
            </Modal>
        </div>
    )
}

export default TestInfoPage
