import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";

export default function AuthNav() {
    return (
     <div className={css.div}>
        <NavLink to="/register" className={css.text}> 
            Register
        </NavLink>
        <NavLink to="/login" className={css.text}>
            Log In
        </NavLink>
     </div>
    );
}