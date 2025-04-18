import { useAttemptStore } from "@/features/attempts/store/useAttemptStore"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { StartAttempt, UserTestDTO } from "@/shared/types/testTypes"
import { Button } from "@/shared/ui/Button"
import Loader from "@/shared/ui/Loader/Loader"
import { isValidUUID } from "@/shared/utils/validator"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from "../../tests/pages/TestInfo/TestInfoPage.module.scss"
const StartTest = () => {
    const { testId } = useParams<{ testId: string }>()
    if (!testId) {
        return <div>ID пользователя не указан</div>
    }
    if (!isValidUUID(testId)) {
        return <div>Невалидный Id</div>
    }
    const { isLoading, startAttempt } = useAttemptStore()
    const { isFetching, getTestForUserById } = useTestStore()
    const [attemptId, setAttemptId] = useState<StartAttempt | null>(null)
    const [test, setTest] = useState<UserTestDTO | null>(null)

    const fetchTest = async () => {
        const fetchedTest = await getTestForUserById(testId)
        if (fetchedTest) {
            setTest(fetchedTest)
        }
    }
    useEffect(() => {
        fetchTest()
    }, [testId])
    if (isFetching || isLoading) {
        return <Loader fullScreen />
    }
    if (!test) {
        return <div>Тест не найден</div>
    }
    const handleStartAttempt = async () => {
        const data = await startAttempt(testId)
        if (data) {
            setAttemptId(data)
        }
    }

    return (
        <div>
            {/* НАЗВАНИЕ ТЕСТА */}
            <div className={styles.blockContent}>
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
            </div>
            <Button onClick={handleStartAttempt}>Начать попытку</Button>
            {attemptId && <p>{attemptId.attemptId}</p>}
        </div>
    )
}

export default StartTest
