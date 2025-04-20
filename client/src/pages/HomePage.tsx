import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { Button } from "@/shared/ui/Button"
import { ValidatedInput } from "@/shared/ui/Input"
import { formatSpaces } from "@/shared/utils/formatter"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

interface StartTest {
    testId: string
}
const HomePage = () => {
    const navigate = useNavigate()
    const { user, logout, isAdmin } = useAuthStore()

    const { register, handleSubmit, setValue } = useForm<StartTest>()
    const onSubmit: SubmitHandler<StartTest> = data => {
        // можно отправить пустое тело
        navigate(`/${formatSpaces(data.testId)}/start`)
    }
    return (
        <>
            <div>
                <h1>{user?.isActivated ? "Аккаунт активирован" : "Аккаунт Не активирован!!!"}</h1>

                {isAdmin && (
                    <>
                        <Button onClick={() => navigate("/admin")}>Админ панель</Button>
                        <Button onClick={() => navigate("/admin/users")}>Пользователи</Button>
                        <Button onClick={() => navigate("/admin/tests")}>Тесты</Button>
                        <Button onClick={() => navigate("/admin/attempts")}>Попытки прохождения</Button>
                        <br />
                        <br />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ValidatedInput
                                clearable
                                name="testId"
                                placeholder="ID теста"
                                register={register}
                                setValue={setValue}
                                validationRules={{
                                    required: "Обязательное поле",
                                }}
                            />
                            <br />
                            <Button type="submit">Пройти тест</Button>
                        </form>

                        {/* <Link to={"/admin/users"}>Пользователи</Link> */}
                        <br />
                        <br />
                    </>
                )}
                {!isAdmin && <h1>Не админ</h1>}

                <Button onClick={() => navigate("/profile")}>Профиль</Button>
                <Button onClick={() => navigate("/create-test")}>Создать Тест</Button>
                <Button onClick={() => navigate("/my-tests")}>Мои тесты</Button>
                <br />
                <br />
                <Button onClick={() => logout()}>Выйти</Button>
            </div>
        </>
    )
}

export default HomePage
