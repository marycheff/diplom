import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { ROUTES } from "@/router/paths"
import { TestDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
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
        <Button onClick={handleCopyTest} className={className} tooltip="Создать копию теста">
            📋
        </Button>
    )
}

export default CopyTestButton
