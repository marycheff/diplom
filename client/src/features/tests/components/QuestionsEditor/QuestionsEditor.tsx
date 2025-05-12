import AnswersList from "@/features/attempts/components/AnswersList/AnswersList"
import QuestionForm from "@/features/tests/components/QuestionForm/QuestionForm"
import QuestionItem from "@/features/tests/components/QuestionItem/QuestionItem"
import { useTestStore } from "@/features/tests/store/useTestStore"
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
import { FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import styles from "./QuestionsEditor.module.scss"

interface QuestionsEditorProps {
    data: QuestionDTO[]
    onQuestionComplete: (questions: QuestionDTO[]) => void
    onCancel: () => void
    setHasUnsavedChanges: (value: boolean) => void
    isLoading: boolean
}
const DEFAULT_NUM_OF_ANSWERS = 3

const QuestionsEditor: FC<QuestionsEditorProps> = ({
    data,
    onQuestionComplete,
    onCancel,
    setHasUnsavedChanges,
    isLoading,
}) => {
    const [questions, setQuestions] = useState<QuestionDTO[]>(data)
    const [editingQuestion, setEditingQuestion] = useState<QuestionDTO | null>(null)
    const [expandedQuestionIds, setExpandedQuestionIds] = useState<string[]>([])
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [questionToDelete, setQuestionToDelete] = useState<string | null>(null)
    const { generateAnswers, isGenerating } = useTestStore()

    const [currentAnswers, setCurrentAnswers] = useState<AnswerDTO[]>(() => {
        return Array(DEFAULT_NUM_OF_ANSWERS)
            .fill(null)
            .map((_, index) => ({
                id: `temp-${Date.now()}-${index}`,
                text: "",
                isCorrect: index === 0,
            }))
    })

    // Добавляем состояние для отслеживания изначального состояния формы
    const [initialFormState, setInitialFormState] = useState({
        question: "",
        answer: "",
        numOfAnswers: DEFAULT_NUM_OF_ANSWERS,
    })

    // Добавляем состояние для отслеживания изначальных ответов
    const [initialAnswers, setInitialAnswers] = useState<AnswerDTO[]>(currentAnswers)

    const { register, handleSubmit, formState, setValue, watch, reset, trigger } = useForm<GenerateAnswerFormData>({
        mode: "onSubmit",
        reValidateMode: "onChange",
        shouldFocusError: false,
        defaultValues: {
            numOfAnswers: DEFAULT_NUM_OF_ANSWERS,
        },
    })

    const currentQuestion = watch("question")
    const currentAnswer = watch("answer")
    const hasErrors = Object.keys(formState.errors).length > 0
    const hasCorrectAnswer = currentAnswers.some(answer => answer.isCorrect)
    const isFormValid = currentQuestion && currentAnswer && !hasErrors && hasCorrectAnswer

    const askQuestion = async (data: GenerateAnswerFormData) => {
        const res = await generateAnswers(data)

        // Сохранение правильного ответа (первый элемент)
        const correctAnswer = currentAnswers[0] || {
            id: `temp-${Date.now()}-0`,
            text: watch("answer") || "", // Берем из поля "Правильный ответ"
            isCorrect: true,
        }

        // Создание массива неправильных ответов (первые N из сгенерированных)
        const incorrectAnswers = res
            .slice(0, data.numOfAnswers) // Берем только нужное количество
            .map((answer: string, index) => ({
                id: `temp-${Date.now()}-${index + 1}`,
                text: answer,
                isCorrect: false,
            }))

        const newAnswers = [correctAnswer, ...incorrectAnswers]
        if (data.numOfAnswers != incorrectAnswers.length) {
            toast.error("Нейросеть сгенерировала неправильное кол-во ответов. Попробуйте еще раз.")
        }

        // Устанавливаем новые ответы
        setCurrentAnswers(newAnswers)
    }

    useEffect(() => {
        if (editingQuestion) {
            setValue("question", editingQuestion.text)
            setValue("answer", editingQuestion.answers.find(a => a.isCorrect)?.text || "")
            setValue("numOfAnswers", DEFAULT_NUM_OF_ANSWERS)
            setCurrentAnswers(editingQuestion.answers)

            // Устанавливаем начальное состояние при редактировании
            setInitialFormState({
                question: editingQuestion.text,
                answer: editingQuestion.answers.find(a => a.isCorrect)?.text || "",
                numOfAnswers: DEFAULT_NUM_OF_ANSWERS,
            })
            setInitialAnswers(editingQuestion.answers)
        } else {
            // Сбрасываем начальное состояние при создании нового вопроса
            setInitialFormState({
                question: "",
                answer: "",
                numOfAnswers: DEFAULT_NUM_OF_ANSWERS,
            })
            setInitialAnswers(currentAnswers)
        }
    }, [editingQuestion, setValue])

    useEffect(() => {
        setQuestions(data)
    }, [data])

    // Проверка наличия изменений в форме
    const hasFormChanges =
        currentQuestion !== initialFormState.question ||
        currentAnswer !== initialFormState.answer ||
        JSON.stringify(currentAnswers) !== JSON.stringify(initialAnswers)

    useEffect(() => {
        const questionsChanged = JSON.stringify(data) !== JSON.stringify(questions)

        // Проверяем, заполнена ли форма (любой текст в полях)
        const isFormFilled = Boolean(currentQuestion || currentAnswer)

        // Устанавливаем флаг несохраненных изменений, если есть изменения в вопросах или в форме
        const hasUnsavedChanges = questionsChanged || (hasFormChanges && isFormFilled)

        setHasUnsavedChanges(hasUnsavedChanges)
    }, [
        questions,
        data,
        setHasUnsavedChanges,
        currentQuestion,
        currentAnswer,
        currentAnswers,
        initialFormState,
        initialAnswers,
        hasFormChanges,
    ])

    const handleCorrectChange = (index: number) => {
        const newAnswers = currentAnswers.map((answer, i) => ({
            ...answer,
            isCorrect: i === index ? !answer.isCorrect : answer.isCorrect,
        }))
        setCurrentAnswers(newAnswers)
    }

    const removeAnswer = (index: number) => {
        if (currentAnswers.length <= 1) return
        setCurrentAnswers(prev => prev.filter((_, i) => i !== index))
    }

    const addAnswer = () => {
        setCurrentAnswers(prev => [...prev, { id: `temp-${Date.now()}`, text: "", isCorrect: false }])
    }

    const handleAddQuestion = (data: GenerateAnswerFormData) => {
        if (currentAnswers.length === 0) {
            const initialAnswers = Array(DEFAULT_NUM_OF_ANSWERS)
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

        reset()
        setEditingQuestion(null)
        const newAnswers = Array(DEFAULT_NUM_OF_ANSWERS)
            .fill(null)
            .map((_, index) => ({
                id: `temp-${Date.now()}-${index}`,
                text: "",
                isCorrect: index === 0,
            }))
        setCurrentAnswers(newAnswers)

        // Сбрасываем начальное состояние формы
        setInitialFormState({
            question: "",
            answer: "",
            numOfAnswers: DEFAULT_NUM_OF_ANSWERS,
        })
        setInitialAnswers(newAnswers)
    }

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
        const newAnswers = Array(DEFAULT_NUM_OF_ANSWERS)
            .fill(null)
            .map((_, index) => ({
                id: `temp-${Date.now()}-${index}`,
                text: "",
                isCorrect: index === 0,
            }))
        setCurrentAnswers(newAnswers)

        // Сбрасываем начальное состояние формы
        setInitialFormState({
            question: "",
            answer: "",
            numOfAnswers: DEFAULT_NUM_OF_ANSWERS,
        })
        setInitialAnswers(newAnswers)
    }

    const toggleAccordion = (questionId: string) => {
        setExpandedQuestionIds(prev => {
            if (prev.includes(questionId)) {
                return prev.filter(id => id !== questionId)
            } else {
                return [...prev, questionId]
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
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over || active.id === over.id) return
        setQuestions(prev => {
            const oldIndex = prev.findIndex(q => q.id === active.id)
            const newIndex = prev.findIndex(q => q.id === over.id)
            return arrayMove(prev, oldIndex, newIndex)
        })
    }

    // Проверка состояния кнопки "Добавить вопрос"
    const isAddButtonDisabled =
        // Если есть несохраненные изменения в заполненной форме
        (hasFormChanges && Boolean(currentQuestion || currentAnswer)) ||
        // Или если форма нового вопроса уже открыта и пуста
        (!editingQuestion && !currentQuestion && !currentAnswer)
    const isFormEmpty =
        !currentQuestion &&
        !currentAnswer &&
        currentAnswers.every(answer => !answer.text || formatSpaces(answer.text) === "")
    if (isLoading) {
        return <Loader fullScreen />
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.questionsList}>
                    <div className={styles.finalActions}>
                        <Button
                            onClick={() => {
                                resetForm()
                                setEditingQuestion(null)
                            }}
                            disabled={isAddButtonDisabled}>
                            Добавить вопрос
                        </Button>
                        <Button
                            onClick={handleSubmitQuestions}
                            disabled={hasFormChanges && Boolean(currentQuestion || currentAnswer)}>
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

                <div className={styles.newQuestionForm}>
                    <div className={styles.formContent}>
                        <h3>{editingQuestion ? "Редактирование вопроса" : "Новый вопрос"}</h3>
                        <div>
                            <QuestionForm
                                register={register}
                                setValue={setValue}
                                errors={formState.errors}
                                trigger={trigger}
                                isGenerating={isGenerating}
                                isButtonDisabled={!isFormValid}
                                onSubmit={handleSubmit(askQuestion)}
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
                        {!editingQuestion && (
                            <Button className={styles.cancelButton} onClick={resetForm} disabled={isFormEmpty}>
                                Очистить форму
                            </Button>
                        )}
                        {/* TODO: КНОПКА ОТМЕНИТЬ ИЗМЕНЕНИЯ */}
                        {editingQuestion && (
                            <Button
                                className={styles.cancelButton}
                                onClick={() => {
                                    resetForm()
                                    setEditingQuestion(null)
                                }}>
                                Отменить изменения
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

export default QuestionsEditor
