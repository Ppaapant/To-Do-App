import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact, updateContact } from "../../redux/contacts/operations"; 
import css from "./Contact.module.css";

const ContactForm = ({ task, isEditMode, setIsEditMode }) => {
  const dispatch = useDispatch();

  
  const initialValues = {
    title: task ? task.title : "",
    description: task ? task.description : "",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Мінімум 3 символи")
      .max(50, "Максимум 50 символів")
      .required("Обов’язкове поле"),
    description: Yup.string()
      .max(100, "Максимум 100 символів")
      .required("Обов’язкове поле"),
  });

  const handleSubmit = (values, actions) => {
    if (isEditMode) {
      dispatch(updateContact({ ...values, id: task.id }));
    } else {
      dispatch(addContact(values));
    }
    actions.resetForm();
    setIsEditMode(false);  
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <label className={css.lab}>
          Title
          <Field type="text" name="title" />
          <ErrorMessage name="title" component="div" />
        </label>

        <label className={css.lab}>
          Description
          <Field type="text" name="description" />
          <ErrorMessage name="description" component="div" />
        </label>

        <button type="submit">{isEditMode ? "Update Task" : "Add Task"}</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
