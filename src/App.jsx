import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react'
import Layout from './components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from './redux/auth/operations';
import { selectIsRefreshing } from './redux/auth/selectors';
import RestrictedRoute from './components/RestrictedRoute';
import PrivateRoute from './components/PrivateRoute';




const HomePage = lazy(() => import ('./pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'));
const ToDoListPage = lazy(() => import('./pages/ToDoListPage/ToDoListPage'));

export default function App() {

const dispatch = useDispatch();

useEffect(() => {
  dispatch(refreshUser())
}, [dispatch])

const isRefreshing = useSelector(selectIsRefreshing);

return isRefreshing ? (
  <strong>Getting user data please wait...</strong>
) : (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage/>} />
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
              <RestrictedRoute component={<LoginPage />} redirectTo="/listpage" />
            }
          />
          <Route
            path="/listpage"
            element={
              <PrivateRoute component={<ToDoListPage />} redirectTo="/login" />
            }/>
            <Route path="/tasks/:listId" element={<ContactPage/>} />
        </Routes>
      </Suspense>
    </Layout>
  )
}


