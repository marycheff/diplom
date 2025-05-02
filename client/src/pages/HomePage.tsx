import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { ROUTES } from "@/router/paths"
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

    const { register, handleSubmit, setValue, trigger } = useForm<StartTest>({
        mode: "onBlur",
        reValidateMode: "onChange",
        shouldFocusError: false,
    })
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
                        <Button onClick={() => navigate(ROUTES.ADMIN)}>Админ панель</Button>
                        <Button onClick={() => navigate(ROUTES.ADMIN_USERS)}>Пользователи</Button>
                        <Button onClick={() => navigate(ROUTES.ADMIN_TESTS)}>Тесты</Button>
                        <Button onClick={() => navigate(ROUTES.ADMIN_ALL_ATTEMPTS)}>Попытки прохождения</Button>
                        <br />
                        <br />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ValidatedInput
                                clearable
                                name="testId"
                                placeholder="ID теста"
                                register={register}
                                setValue={setValue}
                                trigger={trigger}
                                validationRules={{
                                    required: "Обязательное поле",
                                }}
                            />
                            <br />
                            <Button type="submit">Пройти тест</Button>
                        </form>
                        {/* <br />
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
                        </form> */}

                        {/* <Link to={"/admin/users"}>Пользователи</Link> */}
                        <br />
                        <br />
                    </>
                )}
                {!isAdmin && <h1>Не админ</h1>}

                <Button onClick={() => navigate(ROUTES.PROFILE)}>Профиль</Button>
                <Button onClick={() => navigate(ROUTES.CREATE_TEST)}>Создать Тест</Button>
                <Button onClick={() => navigate(ROUTES.MY_TESTS)}>Мои тесты</Button>
                <br />
                <br />
                <Button onClick={() => logout()}>Выйти</Button>
            </div>
        </>
    )
}

export default HomePage
