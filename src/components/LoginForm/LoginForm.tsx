
import { Formik, Form, Field, ErrorMessage } from 'formik';
import css from './LoginForm.module.css';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { AppDispatch } from '../../redux/store';
import * as Yup from 'yup';


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
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      })}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={css.form} autoComplete="off">
          <label className={css.label}>
            Email
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className={css.error} />
          </label>
          <label className={css.label}>
            Password
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" className={css.error} />
          </label>
          <button type="submit">Log In</button>
        </Form>
      )}
    </Formik>
  );
}
