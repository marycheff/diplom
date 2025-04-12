import { FC } from "react"
import styles from "./TestSettingsSkeleton.module.scss"

interface TestSettingsSkeletonProps {
    rows?: number
}

const InfoRowSkeleton: FC<TestSettingsSkeletonProps> = ({ rows = 6 }) => {
    const skeletonRows = Array(rows).fill({})

    return (
        <div className={styles.blockContent}>
            {skeletonRows.map((_, index) => (
                <div key={index} className={styles.infoRow}>
                    <span className={`${styles.label} ${styles.skeleton}`}></span>
                    <span className={`${styles.value} ${styles.skeleton}`}></span>
                </div>
            ))}
        </div>
    )
}

export default InfoRowSkeleton
