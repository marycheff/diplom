import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { testTitleValidationRules } from "@/shared/types/utils/validationRules"
import { Button } from "@/shared/ui/Button"
import { ValidatedInput } from "@/shared/ui/Input"

import { ROUTES } from "@/router/paths"
import Select from "@/shared/ui/Select/Select"
import { formatSpaces } from "@/shared/utils/formatter"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { generatePath, useNavigate } from "react-router-dom"
import styles from "../CreateTestForm/CreateTestForm.module.scss"

interface GenerateTest {
	topic: string
	numOfQuestions: number
}

const questionOptions = [
	{ value: "1", label: "1 вопрос" },
	{ value: "2", label: "2 вопроса" },
	{ value: "3", label: "3 вопроса" },
	{ value: "4", label: "4 вопроса" },
	{ value: "5", label: "5 вопросов" },
	{ value: "6", label: "6 вопросов" },
	{ value: "7", label: "7 вопросов" },
	{ value: "8", label: "8 вопросов" },
	{ value: "9", label: "9 вопросов" },
	{ value: "10", label: "10 вопросов" },
]

const GenerateTestForm = () => {
	const navigate = useNavigate()
	const { isGenerating, generateTest } = useTestStore()
	const { isAdmin } = useAuthStore()

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		trigger,
		watch,
	} = useForm<GenerateTest>({
		mode: "onBlur",
		reValidateMode: "onChange",
		shouldFocusError: false,
		defaultValues: {
			numOfQuestions: 5,
		},
	})

	const onSubmit: SubmitHandler<GenerateTest> = async (data) => {
		const response = await generateTest(formatSpaces(data.topic), Number(data.numOfQuestions))
		toast.success(`Тест создан`)
		isAdmin
			? navigate(generatePath(ROUTES.ADMIN_MY_TEST_INFO, { testId: response?.id }))
			: navigate(generatePath(ROUTES.MY_TEST_INFO, { testId: response?.id }))
	}

	const topic = watch("topic")

	return (
		<>
			<h1 className={styles.title}>Генерация теста</h1>
			<div className={styles.container}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<ValidatedInput
						trigger={trigger}
						clearable
						name="topic"
						placeholder="Тема (обязательно)"
						register={register}
						setValue={setValue}
						errors={errors.topic}
						validationRules={testTitleValidationRules}
						disabled={isGenerating}
					/>

					<Select
						name="numOfQuestions"
						options={questionOptions}
						register={register}
						label="Количество вопросов в тесте"
						disabled={isGenerating}
						value={"5"}
					/>

					<Button
						type="submit"
						disabled={isGenerating || !topic}
					>
						Сгенерировать тест
					</Button>
				</form>
			</div>
		</>
	)
}

export default GenerateTestForm
