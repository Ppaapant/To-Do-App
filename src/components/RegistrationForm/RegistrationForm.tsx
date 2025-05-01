import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";
import { AppDispatch } from "../../redux/store";

interface RegistrationFormValues {
  name: string;
  email: string;
  password: string;
}

export default function RegistrationForm() {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues: RegistrationFormValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Введіть ім’я"),
    email: Yup.string().email("Некоректний email").required("Введіть email"),
    password: Yup.string()
      .min(6, "Пароль має містити щонайменше 6 символів")
      .required("Введіть пароль"),
  });

  const handleSubmit = async (
    values: RegistrationFormValues,
    actions: FormikHelpers<RegistrationFormValues>
  ) => {
    try {
      await dispatch(register(values)).unwrap();
      actions.resetForm();
    } catch (error) {
      alert(`Помилка: ${error}`);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label}>
          Username:
          <Field type="text" name="name" className={css.input} />
          <ErrorMessage name="name" component="div" className={css.error} />
        </label>

        <label className={css.label}>
          Email:
          <Field type="email" name="email" className={css.input} />
          <ErrorMessage name="email" component="div" className={css.error} />
        </label>

        <label className={css.label}>
          Password:
          <Field type="password" name="password" className={css.input} />
          <ErrorMessage name="password" component="div" className={css.error} />
        </label>

        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}