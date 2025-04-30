import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addTodoList } from "../../redux/todoList/todoListOp";

interface FormValues {
  title: string;
}

const ListForm = () => {
  const dispatch = useDispatch();

  const initialValues: FormValues = {
    title: "", 
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Мінімум 3 символи")
      .required("Обов’язкове поле"),
  });

  const handleSubmit = (values: FormValues, actions: any) => {
    dispatch(addTodoList(values));  
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <label>
          Title
          <Field type="text" name="title" />
          <ErrorMessage name="title" component="div" />
        </label>
        <button type="submit">Add List</button>
      </Form>
    </Formik>
  );
};

export default ListForm;
