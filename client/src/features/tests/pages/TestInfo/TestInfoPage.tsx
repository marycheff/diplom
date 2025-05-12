import { useAuthStore } from "@/features/auth/store/useAuthStore"
import CopyTestButton from "@/features/tests/components/CopyTestButton/CopyTestButton"
import QuestionsEditor from "@/features/tests/components/QuestionsEditor/QuestionsEditor"
import TestInfoEditor from "@/features/tests/components/TestInfoEditor/TestInfoEditor"
import TestSettingsEditor from "@/features/tests/components/TestSettingsEditor/TestSettingsEditor"
import InfoRowSkeleton from "@/features/tests/components/TestSettingsSkeleton/TestSettingsSkeleton"
import { useTestStore } from "@/features/tests/store/useTestStore"
import {
    PreTestUserDataLabels,
    QuestionDTO,
    Role,
    ShortTestInfo,
    TestDTO,
    TestSettingsDTO,
    TestVisibilityStatus,
    UpdateTestDTO,
} from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import CopyButton from "@/shared/ui/Button/Copy/CopyButton"
import Loader from "@/shared/ui/Loader/Loader"
import { ConfirmationModal, Modal } from "@/shared/ui/Modal"
import { formatSeconds, formatSpaces, shortenText } from "@/shared/utils/formatter"
import { isValidUUID } from "@/shared/utils/validator"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import styles from "./TestInfoPage.module.scss"

const TestInfoPage = () => {
    const { testId } = useParams<{ testId: string }>()
    const {
        getTestById,
        isFetching,
        updateTestQuestions,
        upsertQuestions,
        isLoading,
        isShortInfoUpdating,
        isSettingsUpdating,
        updateTestSettings,
        updateShortInfo,
        changeVisibilityStatus,
        isVisibilityUpdating,
    } = useTestStore()
    const [test, setTest] = useState<TestDTO | null>(null)
    const { user: currentUser } = useAuthStore()
    const navigate = useNavigate()
    const location = useLocation()
    const [isEditQuestionsModalOpen, setIsEditQuestionsModalOpen] = useState(
        location.pathname.endsWith("/edit-questions")
    )
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(location.pathname.endsWith("/edit-settings"))
    const [isShortInfoModalOpen, setIsShortInfModalOpen] = useState(location.pathname.endsWith("/edit-info"))
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)

    if (!testId) {
        return <div>ID теста не указан</div>
    }
    if (!isValidUUID(testId)) {
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

    const handleAddQuestions = async (newQuestions: QuestionDTO[]) => {
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
    const handleEditQuestionsButton = () => {
        setIsEditQuestionsModalOpen(true)
    }
    const handleEditSettingsButton = () => {
        setIsSettingsModalOpen(true)
    }
    const handleEditShortInfoButton = () => {
        setIsShortInfModalOpen(true)
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
            title: formatSpaces(updatedShortInfo.title),
            description: formatSpaces(updatedShortInfo.description),
        }
        await updateShortInfo(testId, { title: updatedShortInfo.title, description: updatedShortInfo.description })
        toast.success("Информация о тесте обновлена")
        setTest(updatedTest)
    }

    const handleQuestionsUpdate = async (updatedQuestions: QuestionDTO[]) => {
        if (!test) return

        const updatedTest = {
            ...test,
            questions: updatedQuestions,
        }

        await upsertQuestions(test.id, updatedQuestions)
        if (test.questions?.length && test.questions?.length > 0) {
            toast.success("Вопросы обновлены")
        } else {
            toast.success("Вопросы добавлены")
        }
        setTest(updatedTest)
        setIsEditQuestionsModalOpen(false)
    }

    const handleCloseModal = () => {
        if (hasUnsavedChanges) {
            setShowConfirmationModal(true)
        } else {
            setIsEditQuestionsModalOpen(false)
        }
    }
    const handleChangeVisibilityStatus = () => {
        const newStatus =
            test.visibilityStatus === TestVisibilityStatus.HIDDEN
                ? TestVisibilityStatus.PUBLISHED
                : TestVisibilityStatus.HIDDEN
        changeVisibilityStatus(test.id, newStatus)
        setTest(prev =>
            prev
                ? {
                      ...prev,
                      visibilityStatus: newStatus,
                  }
                : null
        )
        toast.success(test.visibilityStatus === TestVisibilityStatus.HIDDEN ? "Тест опубликован" : "Тест скрыт")
    }

    return (
        <div className={styles.container}>
            <div className={styles.topGrid}>
                <div className={styles.infoBlock}>
                    <div className={styles.blockHeader}>
                        <h1 className={styles.blockTitle}>Информация о тесте</h1>
                        <div className={styles.buttonContainer}>
                            <Button onClick={handleEditShortInfoButton} className={styles.addQuestionBtn}>
                                ✏️
                            </Button>
                            <Button
                                onClick={handleChangeVisibilityStatus}
                                className={styles.addQuestionBtn}
                                disabled={isVisibilityUpdating}
                                tooltip={
                                    test.visibilityStatus === TestVisibilityStatus.HIDDEN ? "Опубликовать" : "Скрыть"
                                }>
                                {test.visibilityStatus === TestVisibilityStatus.HIDDEN ? "🔒" : "🔓"}
                            </Button>
                            <CopyTestButton test={test} className={styles.addQuestionBtn} />
                        </div>
                    </div>
                    {isShortInfoUpdating ? (
                        <InfoRowSkeleton rows={4} />
                    ) : (
                        <div className={styles.blockContent}>
                            {currentUser?.role === Role.ADMIN && (
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>ID:</span>
                                    <span className={styles.value}>
                                        {shortenText(test.id)}
                                        <CopyButton textToCopy={test.id} showOnHover />
                                    </span>
                                </div>
                            )}
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Ссылка</span>
                                <span className={styles.value}>
                                    <CopyButton textToCopy={`http://localhost:3000/${test.id}/start`} variant="text" />
                                </span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Название</span>
                                <span className={styles.value}>
                                    {test.title || <span className={styles.emptyField}>не указано</span>}
                                </span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Описание</span>
                                <span className={styles.value}>
                                    {test.description || <span className={styles.emptyField}>не указано</span>}
                                </span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Всего попыток</span>
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
                                {isSettingsUpdating ? (
                                    <InfoRowSkeleton />
                                ) : (
                                    <>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Требуется регистрация</span>
                                            <span className={styles.value}>
                                                {test.settings.requireRegistration ? "Да" : "Нет"}
                                            </span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Показывать детальные результаты</span>
                                            <span className={styles.value}>
                                                {test.settings.showDetailedResults ? "Да" : "Нет"}
                                            </span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Перемешивать вопросы</span>
                                            <span className={styles.value}>
                                                {test.settings.shuffleQuestions ? "Да" : "Нет"}
                                            </span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Перемешивать варианты ответов</span>
                                            <span className={styles.value}>
                                                {test.settings.shuffleAnswers ? "Да" : "Нет"}
                                            </span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Поля ввода</span>
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
                                            <span className={styles.label}>Лимит времени</span>
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

                {test.author.id !== currentUser?.id && (
                    <div className={styles.infoBlock}>
                        <h1 className={styles.blockTitle}>Информация об авторе</h1>
                        <div className={styles.blockContent}>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>ID</span>
                                <span className={styles.value}>
                                    <Link to={`/admin/users/${test.author.id}`} className="actionLink">
                                        {shortenText(test.author.id)}
                                    </Link>
                                    <CopyButton textToCopy={test.author.id} showOnHover />
                                </span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Email</span>
                                <span className={styles.value}>
                                    {test.author.email || <span className={styles.emptyField}>не указан</span>}
                                </span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Имя</span>
                                <span className={styles.value}>
                                    {test.author.name || <span className={styles.emptyField}>не указано</span>}
                                </span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Фамилия</span>
                                <span className={styles.value}>
                                    {test.author.surname || <span className={styles.emptyField}>не указана</span>}
                                </span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Отчество</span>
                                <span className={styles.value}>
                                    {test.author.patronymic || <span className={styles.emptyField}>не указано</span>}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.infoBlock}>
                <div className={styles.blockHeader}>
                    <h1 className={styles.blockTitle}>Вопросы и ответы</h1>
                    <div className={styles.buttonContainer}>
                        <Button
                            onClick={handleEditQuestionsButton}
                            className={styles.addQuestionBtn}
                            tooltip="Редактировать вопросы">
                            {test.questions?.length && test.questions?.length > 0 ? "✏️" : "➕"}
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
                isOpen={isSettingsModalOpen}
                onClose={() => setIsSettingsModalOpen(false)}
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
                isOpen={isShortInfoModalOpen}
                onClose={() => setIsShortInfModalOpen(false)}
                title="Редактирование информации о тесте">
                <TestInfoEditor
                    data={{ title: formatSpaces(test.title), description: formatSpaces(test.description) }}
                    onChangingComplete={data => {
                        handleShortInfoUpdate(data)
                        setIsShortInfModalOpen(false)
                    }}
                    onCancel={() => setIsSettingsModalOpen(false)}
                />
            </Modal>

            <Modal
                fullScreen
                isOpen={isEditQuestionsModalOpen}
                onClose={handleCloseModal}
                title="Редактирование вопросов">
                <QuestionsEditor
                    data={test.questions || []}
                    onQuestionComplete={questions => {
                        handleQuestionsUpdate(questions)
                    }}
                    onCancel={handleCloseModal}
                    setHasUnsavedChanges={setHasUnsavedChanges}
                    isLoading={isLoading}
                />
            </Modal>

            <ConfirmationModal
                isOpen={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
                onConfirm={() => {
                    setIsEditQuestionsModalOpen(false)
                    setShowConfirmationModal(false)
                }}
                title="Несохраненные изменения"
                confirmText="Да"
                cancelText="Нет">
                У вас есть несохраненные изменения. Вы уверены, что хотите закрыть редактор?
            </ConfirmationModal>
        </div>
    )
}

export default TestInfoPage
