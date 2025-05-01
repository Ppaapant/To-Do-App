import { useSelector } from 'react-redux';
import Navigation from '../../components/Navigation/Navigation';
import UserMenu from '../../components/UserMenu/UserMenu';
import AuthNav from '../../components/AuthNav/AuthNav';
import { selectIsLoggedIn } from '../../redux/auth/selectors';


export default function AppBar() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
  
    return (
      <header className="flex gap-5 ml-12 items-center py-4">
        <Navigation />
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </header>
    );
  }