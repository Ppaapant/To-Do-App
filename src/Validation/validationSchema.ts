import * as Yup from "yup";

export const taskValidationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Мінімум 3 символи")
    .max(50, "Максимум 50 символів")
    .required("Обов’язкове поле"),
  description: Yup.string()
    .max(100, "Максимум 100 символів")
    .required("Обов’язкове поле"),
});

export const registrationValidationSchema = Yup.object({
    name: Yup.string().required("Введіть ім’я"),
    email: Yup.string().email("Некоректний email").required("Введіть email"),
    password: Yup.string()
      .min(6, "Пароль має містити щонайменше 6 символів")
      .required("Введіть пароль"),
  });

  export const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  export const listValidationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Мінімум 3 символи")
      .required("Обов’язкове поле"),
  });