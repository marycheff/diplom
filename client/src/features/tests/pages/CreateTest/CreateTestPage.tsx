import { useAuthStore } from "@/features/auth/store/useAuthStore"
import CreateTestForm from "@/features/tests/components/CreateTestForm/CreateTestForm"
import GenerateTestForm from "@/features/tests/components/GenerateTestForm/GenerateTestForm"
import { ROUTES } from "@/router/paths"
import { useState } from "react"
import { FaExclamation, FaMagic, FaPlus } from "react-icons/fa"
import { Link } from "react-router-dom"
import styles from "./CreateTestPage.module.scss"

const CreateTestPage = () => {
	const { user } = useAuthStore()
	const [activeTab, setActiveTab] = useState("create")

	if (!user?.isActivated) {
		return (
			<div className={styles.pageWrapper}>
				<div className={styles.container}>
					<div className={styles.icon}>
						<FaExclamation />
					</div>
					<h2 className={styles.heading}>Активируйте аккаунт</h2>
					<p className={styles.text}>
						Перед созданием теста необходимо подтвердить вашу электронную почту. Проверьте почтовый ящик, указанный при
						регистрации, или{" "}
						<Link
							to={ROUTES.PROFILE}
							className="actionLink"
						>
							перейдите в профиль,
						</Link>{" "}
						чтобы отправить письмо с подтверждением повторно.
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.pageWrapper}>
			{/* <h1 className={styles.title}>Создание теста</h1> */}
			<div className={styles.content}>
				<div className={styles.tabHeaders}>
					<button
						className={`${styles.tabButton} ${activeTab === "create" ? styles.activeTab : ""}`}
						onClick={() => setActiveTab("create")}
						aria-selected={activeTab === "create"}
						role="tab"
					>
						<FaPlus /> Обычный тест
					</button>
					<button
						className={`${styles.tabButton} ${activeTab === "generate" ? styles.activeTab : ""}`}
						onClick={() => setActiveTab("generate")}
						aria-selected={activeTab === "generate"}
						role="tab"
					>
						<FaMagic /> Генерация теста
					</button>
				</div>
				<div
					className={styles.tabContent}
					role="tabpanel"
				>
					{activeTab === "create" && <CreateTestForm />}
					{activeTab === "generate" && <GenerateTestForm />}
				</div>
			</div>
		</div>
	)
}

export default CreateTestPage
