import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logOut, refreshUser } from '../../redux/auth/operations';
import { AppDispatch } from '../../redux/store';
import { useEffect } from 'react';

interface User {
  name: string;
  email: string;
  role: "admin" | "viewer"; 
}

export default function UserMenu() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser) as User;
  const loading = useSelector((state: any) => state.auth.loading);

  
  useEffect(() => {
    if (!user) {
      dispatch(refreshUser());
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logOut());
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>Welcome, {user.name}</p>
      <p>Your role: {user.role}</p> 
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}