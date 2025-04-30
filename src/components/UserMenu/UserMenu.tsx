import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';
import { AppDispatch } from '../../redux/store';

interface User {
  name: string;
  email: string;
}

export default function UserMenu() {
  const dispatch = useDispatch<AppDispatch>(); 
  const user = useSelector(selectUser) as User; 

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div>
      <p>Welcome, {user.name}</p>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}