export interface IAnswer {
    id: string
    text: string
    isCorrect: boolean
    questionId: string
}
export interface IAnswer {
    id: string
    text: string
    isCorrect: boolean
    questionId: string
}

export interface IAnswerResponse extends Omit<IAnswer, "questionId"> {}

export interface IQuestion {
    id: string
    text: string
    order?: number
    answers: IAnswer[]
}

export interface IQuestionResponse {
    id: string
    text: string
    order?: number
    answers: IAnswerResponse[]
}

export interface ITest {
    title: string
    description?: string
    questions: IQuestion[]
    settings?: ITestSettings
}

// Интерфейсы для ответов API
export interface ITestResponse {
    id: string
    authorId: string
    title: string
    description?: string
    questions?: IQuestionResponse[]
    settings?: ITestSettings
}

// export interface IQuestionResponse {
//     id: string
//     text: string
//     order: number
//     answers: IAnswerResponse[]
// }

// export interface IAnswerResponse {
//     id: string
//     text: string
//     isCorrect: boolean
// }

// Интерфейс для обновления теста
export interface IUpdateTest {
    questions: IQuestion[]
}
export interface ITestSettings {
    requireRegistration?: boolean
    inputFields?: any
    requiredFields?: any
    showDetailedResults?: boolean
}

export enum InputFieldKey {
    LastName = "lastName",
    FirstName = "firstName",
    Patronymic = "patronymic",
    Gender = "gender",
    BirthDate = "birthDate",
    Age = "age",
    City = "city",
    Country = "country",
    Phone = "phone",
    Email = "email",
    School = "school",
    Grade = "grade",
    Group = "group",
}

export const InputFieldLabels: Record<InputFieldKey, string> = {
    [InputFieldKey.LastName]: "Фамилия",
    [InputFieldKey.FirstName]: "Имя",
    [InputFieldKey.Patronymic]: "Отчество",
    [InputFieldKey.Gender]: "Пол",
    [InputFieldKey.BirthDate]: "Дата рождения",
    [InputFieldKey.Age]: "Возраст",
    [InputFieldKey.City]: "Город",
    [InputFieldKey.Country]: "Страна",
    [InputFieldKey.Phone]: "Мобильный телефон",
    [InputFieldKey.Email]: "Электронная почта",
    [InputFieldKey.School]: "Номер школы",
    [InputFieldKey.Grade]: "Класс",
    [InputFieldKey.Group]: "Группа",
}
