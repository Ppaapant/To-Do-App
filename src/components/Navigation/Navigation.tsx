import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
export default function Navigation() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
  
    return (
      <nav className="flex gap-8 p-4">  
        <NavLink className="text-black hover:opacity-70" to="/">
          Home
        </NavLink>
        {isLoggedIn && (
          <NavLink className="ml-5 text-black hover:opacity-70" to="/listpage">
          Tasks
        </NavLink>
        )}
      </nav>
    );
  }