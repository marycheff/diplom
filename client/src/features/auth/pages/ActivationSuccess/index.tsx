import { ROUTES } from "@/router/paths"
import { Button } from "@/shared/ui/Button"
import { useNavigate } from "react-router-dom"

const ActivationSuccessPage = () => {
	const navigate = useNavigate()
	const params = new URLSearchParams(location.search)
	const accessToken = params.get("accessToken") || ""

	if (accessToken) {
		localStorage.setItem("token", accessToken)
	}
	const handleLoginClick = () => {
		navigate(ROUTES.LOGIN)
	}

	return (
		<div>
			<h1>Активация прошла успешно!</h1>
			<p>Пожалуйста, войдите в систему снова, чтобы продолжить.</p>
			<Button onClick={handleLoginClick}>Войти</Button>
		</div>
	)
}

export default ActivationSuccessPage
