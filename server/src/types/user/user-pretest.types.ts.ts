export enum PreTestUserData {
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

export const PreTestUserDataLabels: Record<PreTestUserData, string> = {
    [PreTestUserData.LastName]: "Фамилия",
    [PreTestUserData.FirstName]: "Имя",
    [PreTestUserData.Patronymic]: "Отчество",
    [PreTestUserData.Gender]: "Пол",
    [PreTestUserData.BirthDate]: "Дата рождения",
    [PreTestUserData.Age]: "Возраст",
    [PreTestUserData.City]: "Город",
    [PreTestUserData.Country]: "Страна",
    [PreTestUserData.Phone]: "Мобильный телефон",
    [PreTestUserData.Email]: "Электронная почта",
    [PreTestUserData.School]: "Номер школы",
    [PreTestUserData.Grade]: "Класс",
    [PreTestUserData.Group]: "Группа",
}
export interface PreTestUserDataType {
    [key: string]: string | number | boolean | null | undefined
}
