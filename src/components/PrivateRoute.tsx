import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../redux/auth/selectors';
import { ReactNode } from 'react';

interface PrivateRouteProps {
  component: ReactNode;  
  redirectTo: string;    
}
export default function PrivateRoute({ component, redirectTo }: PrivateRouteProps) {
  const isLoggedIn = useSelector(selectIsLoggedIn); 

  return isLoggedIn ? <>{component}</> : <Navigate to={redirectTo} />;
}