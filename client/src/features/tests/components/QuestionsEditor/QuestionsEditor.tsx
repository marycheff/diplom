import AnswersList from "@/features/attempts/components/AnswersList/AnswersList"
import QuestionForm from "@/features/tests/components/QuestionForm/QuestionForm"
import QuestionItem from "@/features/tests/components/QuestionItem/QuestionItem"
import { AnswerDTO, GenerateAnswerFormData, QuestionDTO, QuestionType } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
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
import { FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import styles from "./QuestionsEditor.module.scss"

interface QuestionsEditorProps {
    data: QuestionDTO[]
    onQuestionComplete: (questions: QuestionDTO[]) => void
    onCancel?: () => void
}

const QuestionsEditor: FC<QuestionsEditorProps> = ({ data, onQuestionComplete, onCancel }) => {
    const [questions, setQuestions] = useState<QuestionDTO[]>(data)
    const [editingQuestion, setEditingQuestion] = useState<QuestionDTO | null>(null)
    const [expandedQuestionIds, setExpandedQuestionIds] = useState<string[]>([])

    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [questionToDelete, setQuestionToDelete] = useState<string | null>(null)
    const [currentAnswers, setCurrentAnswers] = useState<AnswerDTO[]>(() => {
        return Array(3)
            .fill(null)
            .map((_, index) => ({
                id: `temp-${Date.now()}-${index}`,
                text: "",
                isCorrect: index === 0,
            }))
    })

    const { register, handleSubmit, formState, setValue, watch, reset, trigger } = useForm<GenerateAnswerFormData>({
        mode: "onBlur",
        reValidateMode: "onChange",
        shouldFocusError: false,
        defaultValues: {
            numOfAnswers: 3,
        },
    })

    const currentQuestion = watch("question")
    const currentAnswer = watch("answer")
    const hasErrors = Object.keys(formState.errors).length > 0
    const hasCorrectAnswer = currentAnswers.some(answer => answer.isCorrect)
    const isFormValid = currentQuestion && currentAnswer && !hasErrors && hasCorrectAnswer

    useEffect(() => {
        if (editingQuestion) {
            setValue("question", editingQuestion.text)
            setValue("answer", editingQuestion.answers.find(a => a.isCorrect)?.text || "")
            setValue("numOfAnswers", 3)
            setCurrentAnswers(editingQuestion.answers)
        }
    }, [editingQuestion, setValue])

    // Инициализация при изменении входных данных
    useEffect(() => {
        setQuestions(data)
    }, [data])

    const handleCorrectChange = (index: number) => {
        const newAnswers = currentAnswers.map((answer, i) => ({
            ...answer,
            isCorrect: i === index ? !answer.isCorrect : answer.isCorrect,
        }))
        setCurrentAnswers(newAnswers)
    }

    const removeAnswer = (index: number) => {
        if (currentAnswers.length <= 3) return
        setCurrentAnswers(prev => prev.filter((_, i) => i !== index))
    }

    const addAnswer = () => {
        setCurrentAnswers(prev => [...prev, { id: `temp-${Date.now()}`, text: "", isCorrect: false }])
    }

    const handleAddQuestion = (data: GenerateAnswerFormData) => {
        if (currentAnswers.length === 0) {
            const initialAnswers = Array(3)
                .fill(null)
                .map((_, index) => ({
                    id: `temp-${Date.now()}-${index}`,
                    text: index === 0 ? data.answer : "",
                    isCorrect: index === 0,
                }))
            setCurrentAnswers(initialAnswers)
            return
        }

        const validAnswers = currentAnswers.filter(answer => formatSpaces(answer.text) !== "")
        const numOfCorrectAnswers = validAnswers.filter(answer => answer.isCorrect).length

        const newQuestion: QuestionDTO = {
            id: editingQuestion?.id || `temp-${Date.now()}`,
            text: data.question,
            type: numOfCorrectAnswers === 1 ? QuestionType.SINGLE_CHOICE : QuestionType.MULTIPLE_CHOICE,
            answers: validAnswers,
        }

        if (editingQuestion) {
            setQuestions(prev => prev.map(q => (q.id === editingQuestion.id ? newQuestion : q)))
        } else {
            setQuestions(prev => [...prev, newQuestion])
        }

        // Сбросить форму и подготовить для нового вопроса
        reset()
        setEditingQuestion(null)
        // setExpandedQuestionId(null)

        // Инициализировать новые поля для ответов
        const newAnswers = Array(3)
            .fill(null)
            .map((_, index) => ({
                id: `temp-${Date.now()}-${index}`,
                text: "",
                isCorrect: index === 0,
            }))
        setCurrentAnswers(newAnswers)
    }

    useEffect(() => {
        if (editingQuestion) {
            setValue("question", editingQuestion.text)
            const correctAnswer = editingQuestion.answers.find(a => a.isCorrect)?.text || ""
            setValue("answer", correctAnswer)
            setCurrentAnswers(editingQuestion.answers)
        } else {
            const initialAnswers = Array(3)
                .fill(null)
                .map((_, index) => ({
                    id: `temp-${Date.now()}-${index}`,
                    text: index === 0 ? watch("answer") || "" : "",
                    isCorrect: index === 0,
                }))
            setCurrentAnswers(initialAnswers)
        }
    }, [editingQuestion, setValue, watch])

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...currentAnswers]
        newAnswers[index] = { ...newAnswers[index], text: value }
        setCurrentAnswers(newAnswers)
        if (index === 0) {
            setValue("answer", value)
        }
    }

    useEffect(() => {
        const correctAnswer = watch("answer")
        if (correctAnswer && currentAnswers.length > 0) {
            const newAnswers = [...currentAnswers]
            newAnswers[0] = { ...newAnswers[0], text: correctAnswer }
            setCurrentAnswers(newAnswers)
        }
    }, [watch("answer")])

    const resetForm = () => {
        reset()
        setEditingQuestion(null)
        setExpandedQuestionIds([])
        setCurrentAnswers(
            Array(3)
                .fill(null)
                .map((_, index) => ({
                    id: `temp-${Date.now()}-${index}`,
                    text: "",
                    isCorrect: index === 0,
                }))
        )
    }

    const toggleAccordion = (questionId: string) => {
        setExpandedQuestionIds(prev => {
            if (prev.includes(questionId)) {
                return prev.filter(id => id !== questionId) // Удалить из массива, если он уже есть
            } else {
                return [...prev, questionId] // Добавить в массив, если его нет
            }
        })
    }

    const editQuestion = (question: QuestionDTO) => {
        setEditingQuestion(question)
    }

    const deleteQuestion = (questionId: string) => {
        setQuestionToDelete(questionId)
        setDeleteModalOpen(true)
    }
    const confirmDeleteQuestion = () => {
        if (questionToDelete) {
            setQuestions(prev => prev.filter(q => q.id !== questionToDelete))
            setExpandedQuestionIds(prev => prev.filter(id => id !== questionToDelete))
            setQuestionToDelete(null)
        }
    }

    const handleSubmitQuestions = () => {
        onQuestionComplete(questions)
        resetForm()
    }
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )
    // Обработчик события завершения перетаскивания
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over || active.id === over.id) return
        setQuestions(prev => {
            const oldIndex = prev.findIndex(q => q.id === active.id)
            const newIndex = prev.findIndex(q => q.id === over.id)
            return arrayMove(prev, oldIndex, newIndex)
        })
    }

    return (
        <>
            <div className={styles.container}>
                {/* Левая колонка - список вопросов */}
                <div className={styles.questionsList}>
                    <div className={styles.finalActions}>
                        <Button
                            onClick={() => {
                                resetForm()
                                setEditingQuestion(null)
                            }}>
                            Добавить вопрос
                        </Button>
                        <Button onClick={handleSubmitQuestions}>Сохранить все</Button>
                        <div>Всего вопросов: {questions.length}</div>
                    </div>

                    <div className={styles.questionsContainer}>
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCorners}
                            onDragEnd={handleDragEnd}
                            modifiers={[restrictToParentElement]} // Ограничиваем перетаскивание внутри контейнера
                        >
                            <SortableContext items={questions.map(q => q.id)} strategy={verticalListSortingStrategy}>
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

                {/* Правая колонка - форма создания/редактирования вопроса */}
                <div className={styles.newQuestionForm}>
                    <div className={styles.formContent}>
                        <h3>{editingQuestion ? "Редактирование вопроса" : "Новый вопрос"}</h3>
                        <div>
                            <QuestionForm
                                register={register}
                                setValue={setValue}
                                errors={formState.errors}
                                trigger={trigger}
                                isLoading={false}
                                isButtonDisabled={!isFormValid}
                                onSubmit={handleSubmit(handleAddQuestion)}
                            />
                            <AnswersList
                                answers={currentAnswers}
                                handleAnswerChange={handleAnswerChange}
                                handleCorrectChange={handleCorrectChange}
                                removeAnswer={removeAnswer}
                                addAnswer={addAnswer}
                                correctAnswer={currentAnswer}
                            />
                        </div>
                    </div>
                    <div className={styles.formActions}>
                        <Button onClick={handleSubmit(handleAddQuestion)} disabled={!isFormValid}>
                            {editingQuestion ? "Сохранить изменения" : "Сохранить вопрос"}
                        </Button>
                        <Button className={styles.cancelButton} onClick={resetForm}>
                            Очистить форму
                        </Button>

                        {/* {onCancel && (
                            <div className={styles.finalActions}>
                                <Button className={styles.cancelButton} onClick={onCancel}>
                                    Закрыть
                                </Button>
                            </div>
                        )} */}
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

export default QuestionsEditor
