import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addTodoList } from "../../redux/todoList/todoListOp";
import { AppDispatch } from "../../redux/store";
import { listValidationSchema } from "../../Validation/validationSchema";

interface FormValues {
  title: string;
  
}

const ListForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues: FormValues = {
    title: "", 
    
  };

  const handleSubmit = (values: FormValues, actions: any) => {
    dispatch(addTodoList(values));  
    actions.resetForm();
  };

  return ( 
    <Formik
      initialValues={initialValues}
      validationSchema={listValidationSchema}
      onSubmit={handleSubmit}
    >
       
      <Form className="flex flex-col items-center justify-center space-y-4">
        <div className="flex flex-col w-full max-w-md space-y-2">
          <label className="font-semibold text-lg text-gray-700">
            Title
            <Field
              type="text"
              name="title"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-600 text-sm"
            />
          </label>
        </div>
      
        <button
          type="submit"
          className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add List
        </button>
      </Form>
    </Formik>
  );
};

export default ListForm;
