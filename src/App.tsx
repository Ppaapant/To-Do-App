import { Route, Routes } from 'react-router-dom';
import { JSX, Suspense, lazy, useEffect } from 'react';
import Layout from './UI/Layout/Layout';
import { refreshUser } from './redux/auth/operations';
import { selectIsRefreshing } from './redux/auth/selectors';
import RestrictedRoute from './components/RestrictedRoute';
import PrivateRoute from './components/PrivateRoute';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import './index.css';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'));
const ToDoListPage = lazy(() => import('./pages/ToDoListPage/ToDoListPage'));

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const isRefreshing = useAppSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <strong>Getting user data please wait...</strong>
  ) : (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                component={<RegisterPage />}
                redirectTo="/listpage"
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo="/listpage"
              />
            }
          />
          <Route
            path="/listpage"
            element={
              <PrivateRoute component={<ToDoListPage />} redirectTo="/login" />
            }
          />
          <Route path="/tasks/:listId" element={<ContactPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
