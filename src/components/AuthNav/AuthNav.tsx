import { NavLink } from "react-router-dom";


export default function AuthNav() {
    return (
        <div className="flex gap-5">
            <NavLink 
                to="/register" 
                className="text-black hover:opacity-70"
            > 
                Register
            </NavLink>
            <NavLink 
                to="/login" 
                className="text-black hover:opacity-70"
            >
                Log In
            </NavLink>
        </div>
    );
}