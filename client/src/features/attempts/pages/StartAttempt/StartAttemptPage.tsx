import { PreTestForm } from "@/features/attempts/components/PreTestForm/PreTestForm"
import { useAttemptStore } from "@/features/attempts/store/useAttemptStore"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { PreTestUserDataType, UserTestDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Loader from "@/shared/ui/Loader/Loader"
import { isValidUUID } from "@/shared/utils/validator"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import styles from "../../../tests/pages/TestInfo/TestInfoPage.module.scss"

const StartAttemptPage = () => {
    const navigate = useNavigate()
    const { testId } = useParams<{ testId: string }>()
    const { isLoading, startAttempt } = useAttemptStore()
    const { isFetching, getTestForUserById } = useTestStore()
    const [test, setTest] = useState<UserTestDTO | null>(null)

    useEffect(() => {
        if (!testId) {
            toast.error("Id теста не указан")
            navigate("/", { replace: true })
            return
        }
        if (!isValidUUID(testId)) {
            toast.error("Невалидный Id теста")
            navigate("/", { replace: true })
            return
        }

        const fetchTest = async () => {
            const fetchedTest = await getTestForUserById(testId)
            if (fetchedTest) {
                setTest(fetchedTest)
            } else {
                toast.error("Тест не найден")
                navigate("/", { replace: true })
            }
        }
        fetchTest()
    }, [testId, getTestForUserById, navigate])

    if (isFetching || isLoading) {
        return <Loader fullScreen />
    }
    if (!test && !isFetching) {
        return <div>Тест не найден</div>
    }

    const handleStartAttempt = async (userData?: PreTestUserDataType) => {
        if (!testId) return
        const data = await startAttempt(testId, userData)
        if (data && data.attemptId) {
            navigate(`/my-attempts/${data.attemptId}`)
        } else {
            toast.error("Не удалось начать попытку. Попробуйте снова")
        }
    }
    const hasRequiredFields = test?.settings?.inputFields && test.settings.inputFields.length > 0
    return (
        <div>
            {/* НАЗВАНИЕ ТЕСТА */}
            <div className={styles.blockContent}>
                <div className={styles.infoRow}>
                    <span className={styles.label}>Название:</span>
                    <span className={styles.value}>
                        {test!.title || <span className={styles.emptyField}>не указано</span>}
                    </span>
                </div>
                <div className={styles.infoRow}>
                    <span className={styles.label}>Описание:</span>
                    <span className={styles.value}>
                        {test!.description || <span className={styles.emptyField}>не указано</span>}
                    </span>
                </div>
            </div>
            {hasRequiredFields ? (
                <PreTestForm
                    inputFields={test!.settings?.inputFields!}
                    onSubmit={handleStartAttempt}
                    isLoading={isLoading}
                />
            ) : (
                <Button onClick={handleStartAttempt}>Начать попытку</Button>
            )}
        </div>
    )
}

export default StartAttemptPage
