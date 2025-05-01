import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { register } from "../../redux/auth/operations";
import { AppDispatch } from "../../redux/store";
import { registrationValidationSchema } from "../../Validation/validationSchema";

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
      validationSchema={registrationValidationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="flex flex-col gap-5" autoComplete="off">
        <label className="flex flex-col">
          Username:
          <Field
            type="text"
            name="name"
            className="mt-1 p-2 border rounded"
          />
          <ErrorMessage
            name="name"
            component="div"
            className="text-red-500 text-sm"
          />
        </label>

        <label className="flex flex-col">
          Email:
          <Field
            type="email"
            name="email"
            className="mt-1 p-2 border rounded"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-sm"
          />
        </label>

        <label className="flex flex-col">
          Password:
          <Field
            type="password"
            name="password"
            className="mt-1 p-2 border rounded"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500 text-sm"
          />
        </label>

        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Register
        </button>
      </Form>
    </Formik>
  );
}