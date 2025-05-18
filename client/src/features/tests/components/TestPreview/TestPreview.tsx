import QuestionRenderer from "@/features/tests/components/QuestionRenderer/QuestionRenderer"
import { TestDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import TestPagination from "@/shared/ui/Pagination/TestPagination/TestPagination"
import React, { useState } from "react"
import styles from "./TestPreview.module.scss"

interface TestPreviewProps {
    test: TestDTO
    onClose: () => void
}

const TestPreview: React.FC<TestPreviewProps> = ({ test, onClose }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = test.questions?.length || 0

    if (!test.questions || test.questions.length === 0) {
        return (
            <div className={styles.previewWrapper}>
                <div className={styles.questionsContainer}>
                    <p className={styles.noQuestions}>Вопросы отсутствуют</p>
                </div>
                <Button className={styles.closeButton} onClick={onClose}>
                    Закрыть
                </Button>
            </div>
        )
    }

    const currentQuestion = test.questions[currentPage - 1]

    return (
        <div className={styles.previewWrapper}>
            <div className={styles.questionsContainer}>
                <TestPagination page={currentPage} totalPages={totalPages} changePage={setCurrentPage} />
                <div className={styles.questionHeader}>
                    <h2>
                        Вопрос {currentPage} из {totalPages}
                    </h2>
                </div>
                <QuestionRenderer
                    question={currentQuestion}
                    selectedAnswers={[]}
                    textAnswer=""
                    isPreviewMode={true}
                    onAnswerChange={() => {}}
                    onTextAnswerChange={() => {}}
                />
            </div>
            <div className={styles.formActions}>
                <Button className={styles.closeButton} onClick={onClose}>
                    Закрыть
                </Button>
            </div>
        </div>
    )
}

export default TestPreview
