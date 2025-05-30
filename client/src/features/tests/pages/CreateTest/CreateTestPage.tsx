import { useAuthStore } from "@/features/auth/store/useAuthStore"
import CreateTestForm from "@/features/tests/components/CreateTestForm/CreateTestForm"
import GenerateTestForm from "@/features/tests/components/GenerateTestForm/GenerateTestForm"
import { ROUTES } from "@/router/paths"
import { Link } from "react-router-dom"
import styles from "./CreateTestPage.module.scss"

const CreateTestPage = () => {
	const { user } = useAuthStore()

	if (!user?.isActivated) {
		return (
			<div className={styles.pageWrapper}>
				<div className={styles.container}>
					<div className={styles.icon}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
							/>
						</svg>
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
			<div className={styles.content}>
				<CreateTestForm />
				<br />
				<br />
				<br />
				<br />
				<br />

				<br />

				<GenerateTestForm />
			</div>
		</div>
	)
}

export default CreateTestPage
