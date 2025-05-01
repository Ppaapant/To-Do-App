
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { AppDispatch } from '../../redux/store';
import { loginValidationSchema } from '../../Validation/validationSchema';


interface FormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (values: FormValues, actions: any) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        console.log('Login success');
      })
      .catch((error) => {
        console.error('Login error:', error);
        actions.setFieldError('email', 'Login failed. Please try again.');
      });

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="w-80 mx-auto mt-10" autoComplete="off">
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-medium">Email</label>
            <Field 
              type="email" 
              name="email" 
              className="p-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="flex flex-col mb-4">
            <label className="mb-2 font-medium">Password</label>
            <Field 
              type="password" 
              name="password" 
              className="p-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <button 
            type="submit" 
            className="w-full p-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Log In
          </button>
        </Form>
      )}
    </Formik>
  );
}