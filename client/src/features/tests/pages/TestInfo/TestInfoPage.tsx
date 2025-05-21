import { useAuthStore } from "@/features/auth/store/useAuthStore"
import CopyTestButton from "@/features/tests/components/CopyTestButton/CopyTestButton"
import ModerationStatusEditor from "@/features/tests/components/ModerationStatusEditor/ModerationStatusEditor"
import QuestionsEditor from "@/features/tests/components/QuestionsEditor/QuestionsEditor"
import TestInfoEditor from "@/features/tests/components/TestInfoEditor/TestInfoEditor"
import TestPreview from "@/features/tests/components/TestPreview/TestPreview"
import TestSettingsEditor from "@/features/tests/components/TestSettingsEditor/TestSettingsEditor"
import InfoRowSkeleton from "@/features/tests/components/TestSettingsSkeleton/TestSettingsSkeleton"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { ROUTES } from "@/router/paths"
import NothingFound from "@/shared/components/NotFound/NothingFound"
import TestNotFound from "@/shared/components/NotFound/TestNotFound"
import { useCache } from "@/shared/hooks/useCache"
import {
    ModerationStatus,
    ModerationStatusLabels,
    PreTestUserDataLabels,
    QuestionDTO,
    QuestionTypeLabels,
    ShortTestInfo,
    TestDTO,
    TestSettingsDTO,
    TestsListDTO,
    TestVisibilityStatus,
} from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import CopyButton from "@/shared/ui/Button/Copy/CopyButton"
import Loader from "@/shared/ui/Loader/Loader"
import { ConfirmationModal, Modal } from "@/shared/ui/Modal"
import { formatSeconds, formatSpaces, shortenText } from "@/shared/utils/formatter"
import { isValidUUID } from "@/shared/utils/validator"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FaLock, FaLockOpen, FaPlus, FaTrash } from "react-icons/fa"
import { FiEdit } from "react-icons/fi"
import { LuEye } from "react-icons/lu"
import { MdEdit } from "react-icons/md"
import { generatePath, Link, useLocation, useNavigate, useParams } from "react-router-dom"
import styles from "./TestInfoPage.module.scss"

const TestInfoPage = () => {
    // Параметры маршрута
    const { testId } = useParams<{ testId: string }>()

    // Хуки из store
    const {
        getTestById,
        isFetching,
        upsertQuestions,
        isLoading,
        isShortInfoUpdating,
        isSettingsUpdating,
        updateTestSettings,
        updateShortInfo,
        changeVisibilityStatus,
        isVisibilityUpdating,
        changeModerationStatus,
        isModerationStatusUpdating,
        deleteTest,
    } = useTestStore()
    const { user: currentUser, isAdmin } = useAuthStore()
    const { clearCache } = useCache<TestsListDTO>(useTestStore, "tests")

    // Навигация и роутинг
    const navigate = useNavigate()
    const location = useLocation()

    // Состояния компонента
    const [test, setTest] = useState<TestDTO | null>(null)
    const [isUpsertQuestionsModalOpen, setIsUpsertQuestionsModalOpen] = useState(
        location.pathname.endsWith("/edit-questions")
    )
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(location.pathname.endsWith("/edit-settings"))
    const [isShortInfoModalOpen, setIsShortInfModalOpen] = useState(location.pathname.endsWith("/edit-info"))
    const [isModerationStatusModalOpen, setIsModerationStatusModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [isDataLoaded, setIsDataLoaded] = useState(false)

    // Проверка параметра testId
    if (!testId) {
        return <NothingFound title="ID теста не указан" />
    }
    if (!isValidUUID(testId)) {
        return <NothingFound title="Невалидный ID теста" />
    }

    // Загрузка теста
    const fetchTest = async () => {
        try {
            const fetchedTest = await getTestById(testId)
            if (fetchedTest) {
                setTest(fetchedTest)
            }
            setIsDataLoaded(true)
        } catch {
            setIsDataLoaded(true)
            return <TestNotFound />
        }
    }

    // Инициализация данных при монтировании
    useEffect(() => {
        fetchTest()
    }, [testId, getTestById])

    // Лоадер на время загрузки
    if (!isDataLoaded) {
        return <Loader fullScreen />
    }
    if (!test) {
        return <TestNotFound />
    }

    // Обработчик открытия модалки редактирования вопросов
    const handleEditQuestionsButton = () => {
        setIsUpsertQuestionsModalOpen(true)
    }

    // Обработчик открытия модалки редактирования настроек
    const handleEditSettingsButton = () => {
        setIsSettingsModalOpen(true)
    }

    // Обработчик открытия модалки редактирования информации
    const handleEditShortInfoButton = () => {
        setIsShortInfModalOpen(true)
    }
    // Обработчик открытия модалки редактирования статуса модерации
    const handleEditModerationStatusButton = () => {
        setIsModerationStatusModalOpen(true)
    }

    // Обработчик открытия предпросмотра
    const handlePreviewButton = () => {
        setIsPreviewModalOpen(true)
    }

    // Обработчик закрытия модалки вопросов
    const handleCloseUpsertQuestionsModal = () => {
        if (hasUnsavedChanges) {
            setShowConfirmationModal(true)
        } else {
            setIsUpsertQuestionsModalOpen(false)
        }
    }

    // Обработчик обновления настроек теста
    const handleSettingsUpdate = async (updatedSettings: TestSettingsDTO) => {
        if (!test) return
        const updatedTest = {
            ...test,
            settings: updatedSettings,
        }
        await updateTestSettings(test.id, updatedSettings)
        setTest(updatedTest)
        clearCache()
        toast.success("Настройки теста обновлены")
    }

    // Обработчик обновления краткой информации
    const handleShortInfoUpdate = async (updatedShortInfo: ShortTestInfo) => {
        const updatedTest = {
            ...test,
            title: formatSpaces(updatedShortInfo.title),
            description: formatSpaces(updatedShortInfo.description),
        }
        await updateShortInfo(testId, { title: updatedShortInfo.title, description: updatedShortInfo.description })
        setTest(updatedTest)
        clearCache()

        toast.success("Информация о тесте обновлена")
    }

    // Обработчик добавления/обновления вопросов
    const handleQuestionsUpsert = async (updatedQuestions: QuestionDTO[]) => {
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
        clearCache()
        setIsUpsertQuestionsModalOpen(false)
    }

    // Обработчик смены статуса видимости
    const handleChangeVisibilityStatus = async () => {
        const newStatus =
            test.visibilityStatus === TestVisibilityStatus.HIDDEN
                ? TestVisibilityStatus.PUBLISHED
                : TestVisibilityStatus.HIDDEN
        await changeVisibilityStatus(test.id, newStatus)
        setTest(prev =>
            prev
                ? {
                      ...prev,
                      visibilityStatus: newStatus,
                  }
                : null
        )
        clearCache()
        toast.success(test.visibilityStatus === TestVisibilityStatus.HIDDEN ? "Тест опубликован" : "Тест скрыт")
    }

    // Обработчик смены статуса модерации
    const handleChangeModerationStatus = async (status: ModerationStatus) => {
        setIsModerationStatusModalOpen(false)
        await changeModerationStatus(test.id, status)
        setTest(prev =>
            prev
                ? {
                      ...prev,
                      moderationStatus: status,
                  }
                : null
        )
        clearCache()
        toast.success("Статус модерации обновлен")
    }

    // Обработчик удаления теста
    const handleDeleteTest = async () => {
        await deleteTest(test.id)
        clearCache()
        toast.success("Тест успешно удален")
        navigate(ROUTES.ADMIN_TESTS)
    }

    return (
        <div className={styles.container}>
            <div className={styles.topGrid}>
                <div className={styles.infoBlock}>
                    <div className={styles.blockHeader}>
                        <h1 className={styles.blockTitle}>Информация о тесте</h1>
                        <div className={styles.buttonContainer}>
                            <Button
                                onClick={() => setIsDeleteModalOpen(true)}
                                className={styles.editBtn}
                                tooltip="Удалить тест">
                                <FaTrash />
                            </Button>
                            <CopyTestButton test={test} className={styles.editBtn} />
                            <Button
                                onClick={handleChangeVisibilityStatus}
                                className={styles.editBtn}
                                disabled={isVisibilityUpdating}
                                tooltip={
                                    test.visibilityStatus === TestVisibilityStatus.HIDDEN ? "Опубликовать" : "Скрыть"
                                }>
                                {test.visibilityStatus === TestVisibilityStatus.HIDDEN ? <FaLock /> : <FaLockOpen />}
                            </Button>
                            <Button
                                onClick={handleEditShortInfoButton}
                                className={styles.editBtn}
                                tooltip="Редактировать">
                                <MdEdit />
                            </Button>
                        </div>
                    </div>
                    {isShortInfoUpdating || isModerationStatusUpdating ? (
                        <InfoRowSkeleton rows={4} />
                    ) : (
                        <div className={styles.blockContent}>
                            {isAdmin && (
                                <>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>ID:</span>
                                        <span className={styles.value}>
                                            {shortenText(test.id)}
                                            <CopyButton textToCopy={test.id} />
                                        </span>
                                    </div>

                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Статус модерации </span>
                                        <span className={styles.value}>
                                            {ModerationStatusLabels[test.moderationStatus]}
                                            <Button
                                                className={styles.editModerationStatusBtn}
                                                onClick={handleEditModerationStatusButton}
                                                tooltip="Редактировать">
                                                <FiEdit />
                                            </Button>
                                        </span>
                                    </div>
                                </>
                            )}
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Ссылка для прохождения</span>
                                <span className={styles.value}>
                                    {test.visibilityStatus === TestVisibilityStatus.PUBLISHED ? (
                                        <CopyButton
                                            textToCopy={`http://localhost:3000/${test.id}/start`}
                                            variant="text"
                                        />
                                    ) : (
                                        <span className={styles.emptyField}>Тест скрыт</span>
                                    )}
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
                                    ) : isAdmin ? (
                                        <Link
                                            to={generatePath(ROUTES.ADMIN_TEST_ATTEMPTS, { testId: test.id })}
                                            className="actionLink">
                                            {test.totalAttempts}
                                        </Link>
                                    ) : (
                                        <Link
                                            to={generatePath(ROUTES.MY_TEST_ATTEMPTS, { testId: test.id })}
                                            className="actionLink">
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
                            <Button
                                onClick={handleEditSettingsButton}
                                className={styles.editBtn}
                                tooltip="Редактировать">
                                <MdEdit />
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
                                            <span className={styles.label}>Разрешить повторное прохождение</span>
                                            <span className={styles.value}>
                                                {test.settings.allowRetake ? "Да" : "Нет"}
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
                                    <Link
                                        to={generatePath(ROUTES.ADMIN_USER_INFO, { userId: test.author.id })}
                                        className="actionLink">
                                        {shortenText(test.author.id)}
                                    </Link>
                                    <CopyButton textToCopy={test.author.id} />
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
                    {test.questions?.length && test.questions?.length > 0 ? (
                        <h1 className={styles.blockTitle}>Вопросы и ответы ({test.questions.length})</h1>
                    ) : (
                        <h1 className={styles.blockTitle}>Вопросы и ответы</h1>
                    )}
                    <div className={styles.buttonContainer}>
                        <Button
                            onClick={handleEditQuestionsButton}
                            className={styles.editBtn}
                            tooltip={
                                test.questions?.length && test.questions?.length > 0
                                    ? "Редактировать"
                                    : "Добавить вопросы"
                            }>
                            {test.questions?.length && test.questions?.length > 0 ? <MdEdit /> : <FaPlus />}
                        </Button>
                        {test.questions?.length && test.questions?.length > 0 ? (
                            <Button onClick={handlePreviewButton} className={styles.editBtn} tooltip="Предпросмотр">
                                <LuEye />
                            </Button>
                        ) : null}
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
                                            <span className={styles.questionType}>
                                                {QuestionTypeLabels[question.type]}
                                            </span>
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
                isOpen={isUpsertQuestionsModalOpen}
                onClose={handleCloseUpsertQuestionsModal}
                title="Редактирование вопросов">
                <QuestionsEditor
                    data={test.questions || []}
                    onQuestionComplete={questions => {
                        handleQuestionsUpsert(questions)
                    }}
                    onCancel={handleCloseUpsertQuestionsModal}
                    setHasUnsavedChanges={setHasUnsavedChanges}
                    isLoading={isLoading}
                />
            </Modal>

            <Modal
                fullScreen
                isOpen={isPreviewModalOpen}
                onClose={() => setIsPreviewModalOpen(false)}
                title="Предпросмотр теста">
                <TestPreview test={test} onClose={() => setIsPreviewModalOpen(false)} />
            </Modal>

            <ConfirmationModal
                isOpen={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
                onConfirm={() => {
                    setIsUpsertQuestionsModalOpen(false)
                    setShowConfirmationModal(false)
                }}
                title="Несохраненные изменения"
                confirmText="Да"
                cancelText="Нет">
                У вас есть несохраненные изменения. Вы уверены, что хотите закрыть редактор?
            </ConfirmationModal>

            <Modal
                isOpen={isModerationStatusModalOpen}
                onClose={() => setIsModerationStatusModalOpen(false)}
                title="Изменение статуса модерации">
                <ModerationStatusEditor
                    currentStatus={test.moderationStatus}
                    onChangingComplete={handleChangeModerationStatus}
                    onCancel={() => setIsModerationStatusModalOpen(false)}
                />
            </Modal>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteTest}
                title="Удаление теста"
                confirmText="Удалить"
                cancelText="Отмена">
                <p>Вы уверены, что хотите удалить этот тест?</p>
            </ConfirmationModal>
        </div>
    )
}

export default TestInfoPage
