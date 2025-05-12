import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { ROUTES } from "@/router/paths"
import { TestDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import ConfirmationModal from "@/shared/ui/Modal/Confirmation/ConfirmationModal"
import { useState } from "react"
import toast from "react-hot-toast"
import { generatePath, useNavigate } from "react-router-dom"

interface CopyTestButtonProps {
    test: TestDTO
    className?: string
}

const CopyTestButton = ({ test, className }: CopyTestButtonProps) => {
    const { createTest, updateTestSettings, updateShortInfo, upsertQuestions } = useTestStore()
    const navigate = useNavigate()
    const { isAdmin } = useAuthStore()
    const [isCopyModalOpen, setIsCopyModalOpen] = useState(false)

    const handleCopyTest = async () => {
        try {
            const copiedTest = await createTest(`Копия: ${test.title}`, test.description || "")
            if (copiedTest?.id) {
                if (test.settings) {
                    await updateTestSettings(copiedTest.id, test.settings)
                }
                await updateShortInfo(copiedTest.id, {
                    title: `Копия: ${test.title}`,
                    description: test.description || "",
                })
                if (test.questions && test.questions.length > 0) {
                    const questionsWithoutIds = test.questions.map(question => ({
                        ...question,
                        id: "",
                        answers: question.answers?.map(answer => ({ ...answer, id: "" })) || [],
                    }))
                    await upsertQuestions(copiedTest.id, questionsWithoutIds)
                }
                toast.success("Тест скопирован")

                if (isAdmin) {
                    navigate(generatePath(ROUTES.ADMIN_TEST_INFO, { testId: copiedTest.id }))
                    return
                }
                navigate(generatePath(ROUTES.MY_TESTS, { testId: copiedTest.id }))
            }
        } catch (error) {
            toast.error("Не удалось скопировать тест")
        }
    }

    return (
        <>
            <Button onClick={() => setIsCopyModalOpen(true)} className={className} tooltip="Создать копию теста">
                📋
            </Button>

            <ConfirmationModal
                isOpen={isCopyModalOpen}
                onClose={() => setIsCopyModalOpen(false)}
                onConfirm={handleCopyTest}
                title="Подтверждение копирования"
                confirmText="Копировать"
                cancelText="Отмена">
                <p>Вы уверены, что хотите создать копию теста "{test.title}"?</p>
            </ConfirmationModal>
        </>
    )
}

export default CopyTestButton
