import AnswersList from "@/features/attempts/components/AnswersList/AnswersList"
import FillInTheBlankQuestionForm from "@/features/tests/components/FillInTheBlankQuestionForm"
import QuestionForm from "@/features/tests/components/QuestionForm/QuestionForm"
import QuestionItem from "@/features/tests/components/QuestionItem/QuestionItem"
import TextInputQuestionForm from "@/features/tests/components/TextInputQuestionForm/TextInputQuestionForm"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { usePreventLeave } from "@/shared/hooks/usePreventLeave"
import { AnswerDTO, GenerateAnswerFormData, QuestionDTO, QuestionType } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Loader from "@/shared/ui/Loader/Loader"
import { ConfirmationModal } from "@/shared/ui/Modal"
import { formatSpaces } from "@/shared/utils/formatter"
import {
    closestCorners,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core"
import { restrictToParentElement } from "@dnd-kit/modifiers"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import styles from "./QuestionsEditor.module.scss"

interface QuestionsEditorProps {
    data: QuestionDTO[]
    onQuestionComplete: (questions: QuestionDTO[]) => void
    setHasUnsavedChanges: (value: boolean) => void
    isLoading: boolean
}

const DEFAULT_NUM_OF_ANSWERS = 3

interface TextInputFormData {
    question: string
    answer: string
}

// Вынесем создание дефолтных ответов в отдельную функцию
const createDefaultAnswers = () =>
    Array(DEFAULT_NUM_OF_ANSWERS)
        .fill(null)
        .map((_, index) => ({
            id: `temp-${Date.now()}-${index}`,
            text: "",
            isCorrect: index === 0,
        }))

const QuestionsEditor: FC<QuestionsEditorProps> = ({ data, onQuestionComplete, setHasUnsavedChanges, isLoading }) => {
    const [questions, setQuestions] = useState<QuestionDTO[]>(data)
    const [editingQuestion, setEditingQuestion] = useState<QuestionDTO | null>(null)
    const [expandedQuestionIds, setExpandedQuestionIds] = useState<string[]>([])
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [questionToDelete, setQuestionToDelete] = useState<string | null>(null)
    const [questionType, setQuestionType] = useState<QuestionType>(QuestionType.MULTIPLE_CHOICE)
    const { generateAnswers, isGenerating } = useTestStore()

    // Используем useRef для стабильного initialState
    const initialStateRef = useRef({
        form: { question: "", answer: "", numOfAnswers: DEFAULT_NUM_OF_ANSWERS },
        answers: createDefaultAnswers(),
    })

    const [currentAnswers, setCurrentAnswers] = useState<AnswerDTO[]>(initialStateRef.current.answers)

    const { register, handleSubmit, formState, setValue, watch, reset, trigger } = useForm<
        GenerateAnswerFormData & TextInputFormData
    >({
        mode: "onSubmit",
        reValidateMode: "onChange",
        shouldFocusError: false,
        defaultValues: { numOfAnswers: DEFAULT_NUM_OF_ANSWERS },
    })

    const currentQuestion = watch("question")
    const currentAnswer = watch("answer")

    // Синхронизация поля "answer" с первым вариантом ответа
    useEffect(() => {
        const correctAnswer = watch("answer")
        if (correctAnswer !== undefined && currentAnswers.length > 0) {
            setCurrentAnswers(prev => {
                const newAnswers = [...prev]
                newAnswers[0] = { ...newAnswers[0], text: correctAnswer, isCorrect: true }
                return newAnswers
            })
        }
    }, [watch("answer")])

    // Мемоизируем вычисления
    const hasErrors = useMemo(() => Object.keys(formState.errors).length > 0, [formState.errors])
    const hasCorrectAnswer = useMemo(() => currentAnswers.some(answer => answer.isCorrect), [currentAnswers])
    const isFormValid = useMemo(
        () =>
            currentQuestion &&
            currentAnswer &&
            !hasErrors &&
            (questionType === QuestionType.TEXT_INPUT || hasCorrectAnswer),
        [currentQuestion, currentAnswer, hasErrors, questionType, hasCorrectAnswer]
    )

    const hasFormChanges = useMemo(() => {
        return (
            currentQuestion !== initialStateRef.current.form.question ||
            currentAnswer !== initialStateRef.current.form.answer ||
            JSON.stringify(currentAnswers) !== JSON.stringify(initialStateRef.current.answers)
        )
    }, [currentQuestion, currentAnswer, currentAnswers])

    const questionsChanged = useMemo(() => {
        return JSON.stringify(data) !== JSON.stringify(questions)
    }, [data, questions])

    // Мемоизируем sensors чтобы они не пересоздавались
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    // Мемоизируем массив идентификаторов вопросов
    const questionIds = useMemo(() => questions.map(q => q.id), [questions])

    useEffect(() => {
        if (editingQuestion) {
            const correctAnswer = editingQuestion.answers.find(a => a.isCorrect)?.text || ""
            setValue("question", editingQuestion.text)
            setValue("answer", correctAnswer)
            setValue("numOfAnswers", DEFAULT_NUM_OF_ANSWERS)
            setValue("image", editingQuestion.image || "")

            setQuestionType(editingQuestion.type)
            setCurrentAnswers(editingQuestion.answers)

            // Обновляем ref
            initialStateRef.current = {
                form: { question: editingQuestion.text, answer: correctAnswer, numOfAnswers: DEFAULT_NUM_OF_ANSWERS },
                answers: editingQuestion.answers,
            }
        } else {
            reset()
            const newAnswers = createDefaultAnswers()
            setCurrentAnswers(newAnswers)

            // Обновляем ref
            initialStateRef.current = {
                form: { question: "", answer: "", numOfAnswers: DEFAULT_NUM_OF_ANSWERS },
                answers: newAnswers,
            }
        }
    }, [editingQuestion, setValue, reset])

    useEffect(() => {
        const isFormFilled = Boolean(currentQuestion || currentAnswer)
        setHasUnsavedChanges(questionsChanged || (hasFormChanges && isFormFilled))
    }, [questionsChanged, setHasUnsavedChanges, currentQuestion, currentAnswer, hasFormChanges])

    const handleCorrectChange = useCallback((index: number) => {
        setCurrentAnswers(prev =>
            prev.map((answer, i) => ({
                ...answer,
                isCorrect: i === index ? !answer.isCorrect : answer.isCorrect,
            }))
        )
    }, [])

    const removeAnswer = useCallback((index: number) => {
        setCurrentAnswers(prev => {
            if (prev.length <= 1) return prev
            return prev.filter((_, i) => i !== index)
        })
    }, [])

    const addAnswer = useCallback(() => {
        setCurrentAnswers(prev => [...prev, { id: `temp-${Date.now()}`, text: "", isCorrect: false }])
    }, [])

    const handleAnswerChange = useCallback(
        (index: number, value: string) => {
            setCurrentAnswers(prev => {
                const newAnswers = [...prev]
                newAnswers[index] = { ...newAnswers[index], text: value }
                return newAnswers
            })

            // Синхронизация первого ответа с полем "answer"
            if (index === 0) {
                setValue("answer", value)
            }
        },
        [setValue]
    )

    const askQuestion = useCallback(
        async (data: GenerateAnswerFormData) => {
            const res = await generateAnswers(data)
            const correctAnswer = {
                id: `temp-${Date.now()}-0`,
                text: watch("answer") || "",
                isCorrect: true,
            }
            const incorrectAnswers = res.slice(0, data.numOfAnswers).map((answer: string, index) => ({
                id: `temp-${Date.now()}-${index + 1}`,
                text: answer,
                isCorrect: false,
            }))
            const newAnswers = [correctAnswer, ...incorrectAnswers]
            if (data.numOfAnswers !== incorrectAnswers.length) {
                toast.error("Нейросеть сгенерировала неправильное кол-во ответов. Попробуйте еще раз.")
            }
            setCurrentAnswers(newAnswers)
        },
        [generateAnswers, watch]
    )

    const handleAddQuestion = useCallback(
        (data: GenerateAnswerFormData & TextInputFormData & { image?: string }) => {
            console.log(data.image)
            if (questionType === QuestionType.TEXT_INPUT || questionType === QuestionType.FILL_IN_THE_BLANK) {
                const newQuestion: QuestionDTO = {
                    id: editingQuestion?.id || `temp-${Date.now()}`,
                    text: formatSpaces(data.question),
                    type: questionType,
                    image: data.image || null,
                    answers: [{ id: `temp-${Date.now()}-0`, text: formatSpaces(data.answer), isCorrect: true }],
                }
                setQuestions(prev =>
                    editingQuestion
                        ? prev.map(q => (q.id === editingQuestion.id ? newQuestion : q))
                        : [...prev, newQuestion]
                )
                reset()
                setEditingQuestion(null)
                return
            }

            const validAnswers = currentAnswers.filter(answer => formatSpaces(answer.text) !== "")
            const numOfCorrectAnswers = validAnswers.filter(answer => answer.isCorrect).length
            const newQuestion: QuestionDTO = {
                id: editingQuestion?.id || `temp-${Date.now()}`,
                text: formatSpaces(data.question),
                type: numOfCorrectAnswers === 1 ? QuestionType.SINGLE_CHOICE : QuestionType.MULTIPLE_CHOICE,
                image: data.image || null,
                answers: validAnswers,
            }
            setQuestions(prev =>
                editingQuestion
                    ? prev.map(q => (q.id === editingQuestion.id ? newQuestion : q))
                    : [...prev, newQuestion]
            )
            reset()
            setEditingQuestion(null)
            const newAnswers = createDefaultAnswers()
            setCurrentAnswers(newAnswers)

            // Обновляем ref
            initialStateRef.current = {
                form: { question: "", answer: "", numOfAnswers: DEFAULT_NUM_OF_ANSWERS },
                answers: newAnswers,
            }
        },
        [editingQuestion, questionType, currentAnswers, reset]
    )

    const resetForm = useCallback(() => {
        reset()
        setEditingQuestion(null)
        setExpandedQuestionIds([])
        const newAnswers = createDefaultAnswers()
        setCurrentAnswers(newAnswers)
        setQuestionType(QuestionType.SINGLE_CHOICE)
        setValue("image", "")

        // Обновляем ref
        initialStateRef.current = {
            form: { question: "", answer: "", numOfAnswers: DEFAULT_NUM_OF_ANSWERS },
            answers: newAnswers,
        }
    }, [reset, setValue])

    const toggleAccordion = useCallback((questionId: string) => {
        setExpandedQuestionIds(prev =>
            prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId]
        )
    }, [])

    const editQuestion = useCallback(
        (question: QuestionDTO) => {
            setEditingQuestion(question)
            setQuestionType(question.type)
            setValue("image", question.image || "")
        },
        [setValue]
    )

    const deleteQuestion = useCallback((questionId: string) => {
        setQuestionToDelete(questionId)
        setDeleteModalOpen(true)
    }, [])

    const confirmDeleteQuestion = useCallback(() => {
        if (questionToDelete) {
            setQuestions(prev => prev.filter(q => q.id !== questionToDelete))
            setExpandedQuestionIds(prev => prev.filter(id => id !== questionToDelete))
            setQuestionToDelete(null)
            resetForm()
        }
        setDeleteModalOpen(false)
    }, [questionToDelete, resetForm])

    const handleSubmitQuestions = useCallback(() => {
        onQuestionComplete(questions)
        resetForm()
    }, [questions, onQuestionComplete, resetForm])

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event
        if (!over || active.id === over.id) return
        setQuestions(prev => {
            const oldIndex = prev.findIndex(q => q.id === active.id)
            const newIndex = prev.findIndex(q => q.id === over.id)
            return arrayMove(prev, oldIndex, newIndex)
        })
    }, [])

    const isAddButtonDisabled = useMemo(
        () =>
            (hasFormChanges && Boolean(currentQuestion || currentAnswer)) ||
            (!editingQuestion && !currentQuestion && !currentAnswer),
        [hasFormChanges, currentQuestion, currentAnswer, editingQuestion]
    )

    const isFormEmpty = useMemo(
        () =>
            !currentQuestion &&
            !currentAnswer &&
            currentAnswers.every(answer => !answer.text || formatSpaces(answer.text) === ""),
        [currentQuestion, currentAnswer, currentAnswers]
    )

    usePreventLeave({ shouldPrevent: hasFormChanges && Boolean(currentQuestion || currentAnswer) })

    if (isLoading) {
        return <Loader fullScreen />
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.questionsList}>
                    <div className={styles.finalActions}>
                        <Button onClick={resetForm} disabled={isAddButtonDisabled}>
                            Добавить вопрос
                        </Button>
                        <Button
                            onClick={handleSubmitQuestions}
                            disabled={
                                !questionsChanged || (hasFormChanges && Boolean(currentQuestion || currentAnswer))
                            }>
                            Сохранить все
                        </Button>
                        <div>Всего вопросов: {questions.length}</div>
                    </div>

                    <div className={styles.questionsContainer}>
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCorners}
                            onDragEnd={handleDragEnd}
                            modifiers={[restrictToParentElement]}>
                            <SortableContext items={questionIds} strategy={verticalListSortingStrategy}>
                                <div className={styles.questionsContainer}>
                                    {questions.map(question => (
                                        <QuestionItem
                                            key={question.id}
                                            id={question.id}
                                            order={questions.indexOf(question) + 1}
                                            question={question}
                                            expanded={expandedQuestionIds.includes(question.id)}
                                            onToggle={() => toggleAccordion(question.id)}
                                            onEdit={() => editQuestion(question)}
                                            onDelete={() => deleteQuestion(question.id)}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    </div>
                </div>

                <div className={styles.newQuestionForm}>
                    <div className={styles.formContent}>
                        <h3 className={styles.title}>{editingQuestion ? "Редактирование вопроса" : "Новый вопрос"}</h3>
                        <div className={styles.questionTypeSelector}>
                            <label htmlFor="questionType">Тип вопроса:</label>
                            <select
                                id="questionType"
                                value={questionType}
                                disabled={editingQuestion !== null}
                                onChange={e => setQuestionType(e.target.value as QuestionType)}
                                className={styles.selectInput}>
                                <option value={QuestionType.MULTIPLE_CHOICE}>Варианты ответа</option>
                                <option value={QuestionType.TEXT_INPUT}>Текстовый ввод</option>
                                <option value={QuestionType.FILL_IN_THE_BLANK}>Заполнить пропуск</option>
                            </select>
                        </div>
                        <div>
                            {questionType === QuestionType.TEXT_INPUT ? (
                                <TextInputQuestionForm
                                    register={register}
                                    setValue={setValue}
                                    errors={formState.errors}
                                    onSubmit={handleSubmit(handleAddQuestion)}
                                    trigger={trigger}
                                    watch={watch}
                                />
                            ) : questionType === QuestionType.FILL_IN_THE_BLANK ? (
                                <FillInTheBlankQuestionForm
                                    register={register}
                                    setValue={setValue}
                                    errors={formState.errors}
                                    onSubmit={handleSubmit(handleAddQuestion)}
                                    isEditing={!!editingQuestion}
                                    trigger={trigger}
                                    watch={watch}
                                    
                                />
                            ) : (
                                <>
                                    <QuestionForm
                                        register={register}
                                        setValue={setValue}
                                        errors={formState.errors}
                                        trigger={trigger}
                                        isGenerating={isGenerating}
                                        isButtonDisabled={!isFormValid}
                                        onSubmit={handleSubmit(askQuestion)}
                                        watch={watch}
                                    />
                                    <AnswersList
                                        answers={currentAnswers}
                                        handleAnswerChange={handleAnswerChange}
                                        handleCorrectChange={handleCorrectChange}
                                        removeAnswer={removeAnswer}
                                        addAnswer={addAnswer}
                                        correctAnswer={currentAnswer}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    <div className={styles.formActions}>
                        <Button onClick={handleSubmit(handleAddQuestion)} disabled={!isFormValid}>
                            {editingQuestion ? "Сохранить изменения" : "Сохранить вопрос"}
                        </Button>
                        {!editingQuestion && (
                            <Button className={styles.cancelButton} onClick={resetForm} disabled={isFormEmpty}>
                                Очистить форму
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDeleteQuestion}
                title="Удаление вопроса"
                confirmText="Удалить"
                cancelText="Отмена">
                <p>Вы уверены, что хотите удалить этот вопрос?</p>
            </ConfirmationModal>
        </>
    )
}

export default React.memo(QuestionsEditor)
