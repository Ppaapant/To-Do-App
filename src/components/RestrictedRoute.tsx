import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../redux/auth/selectors';
import { ReactNode } from 'react';

interface RestrictedRouteProps {
  component: ReactNode;  
  redirectTo: string;    
}

export default function RestrictedRoute({ component, redirectTo }: RestrictedRouteProps) {
  const isLoggedIn = useSelector(selectIsLoggedIn); 

  return isLoggedIn ? <Navigate to={redirectTo} /> : <>{component}</>;
}