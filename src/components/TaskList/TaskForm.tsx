import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addContact, updateContact } from "../../redux/contacts/operations"; 
import { AppDispatch } from "../../redux/store";
import { taskValidationSchema } from "../../Validation/validationSchema";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface ContactFormProps {
  task?: Task; 
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ task, isEditMode, setIsEditMode }) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    title: task ? task.title : "",
    description: task ? task.description : "",
  };

  const handleSubmit = (values: typeof initialValues, actions: any) => {
    if (isEditMode && task) {
      dispatch(updateContact({
        ...values,
        id: task.id,
        completed: false 
      }));
    } else {
      dispatch(addContact({
        ...values,
        completed: false 
      }));
    }
  
    actions.resetForm();
    setIsEditMode(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={taskValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      <Form className="space-y-6 bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-700">Title</label>
          <Field 
            type="text" 
            name="title" 
            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-700">Description</label>
          <Field 
            type="text" 
            name="description" 
            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
        </div>

        <button 
          type="submit" 
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          {isEditMode ? "Update Task" : "Add Task"}
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;