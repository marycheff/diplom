import { useTestStore } from "@/features/tests/store/useTestStore"
import { TestSnapshotDTO } from "@/shared/types"
import Loader from "@/shared/ui/Loader/Loader"
import { isValidUUID } from "@/shared/utils/validator"
import { FC, useEffect, useState } from "react"
import styles from "./Snapshot.module.scss"

interface SnapshotProps {
    snapshotId: string
}

const Snapshot: FC<SnapshotProps> = ({ snapshotId }) => {
    // const { snapshotId } = useParams<{ snapshotId: string }>()
    const { getSnapshotById, isFetching } = useTestStore()
    const [snapshot, setSnapshot] = useState<TestSnapshotDTO | null>(null)

    if (!snapshotId) {
        return <div>ID теста не указан</div>
    }
    if (!isValidUUID(snapshotId)) {
        return <div>Невалидный Id</div>
    }
    const fetchSnapshot = async () => {
        const fetchedSnapshot = await getSnapshotById(snapshotId)
        if (fetchedSnapshot) {
            setSnapshot(fetchedSnapshot.snapshot)
        }
    }
    useEffect(() => {
        fetchSnapshot()
    }, [snapshotId, getSnapshotById])

    if (isFetching) {
        return <Loader fullScreen />
    }

    if (!snapshot) {
        return <div>Снимок не найден</div>
    }

    return (
        <div className={styles.container}>
            <h1>{snapshot.title}</h1>
            <p>{snapshot.description || "Описание отсутствует"}</p>
            <p>Статус: {snapshot.status}</p>
            <div>
                <h2>Вопросы</h2>
                {snapshot.questions.map((question, index) => (
                    <div key={question.id} className={styles.questionBlock}>
                        <h3>
                            {index + 1}. {question.text}
                        </h3>
                        <ul>
                            {question.answers.map(answer => (
                                <li key={answer.id} className={answer.isCorrect ? styles.correctAnswer : ""}>
                                    {answer.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Snapshot
