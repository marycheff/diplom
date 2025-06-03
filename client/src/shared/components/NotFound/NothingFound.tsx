import { ROUTES } from "@/router/paths"
import { Button } from "@/shared/ui/Button"
import { TbError404 } from "react-icons/tb"
import { useNavigate } from "react-router-dom"
import styles from "./NothingFound.module.scss"

interface NothingFoundProps {
	title?: string
	description?: string
	icon?: React.ReactNode
	buttonText?: string
	onButtonClick?: () => void
}

const NothingFound = ({
	title = "Ничего не найдено",
	description = "К сожалению, мы не можем найти то, что вы ищете. Пожалуйста, проверьте ваш запрос и попробуйте снова.",
	icon = <TbError404 />,
	buttonText = "На главную",
	onButtonClick,
}: NothingFoundProps) => {
	const navigate = useNavigate()

	const handleClick = () => {
		if (onButtonClick) return onButtonClick()
		navigate(ROUTES.HOME)
	}

	return (
		<div className={styles.emptyStateContainer}>
			<div className={styles.emptyState}>
				<div className={styles.emoji}>{icon}</div>
				<h2 className={styles.title}>{title}</h2>
				<p className={styles.description}>{description}</p>
				<Button onClick={handleClick}>{buttonText}</Button>
			</div>
		</div>
	)
}

export default NothingFound
