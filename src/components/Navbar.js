import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const token = localStorage.getItem("Token"); // Check if token exists

    function handleLogout() {
        localStorage.removeItem("Token"); // Remove token on logout
        window.location.href = "/login"; // Redirect to login page
    }

    return (
        <nav>
            <h1>Todo App</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
<li>
             <Link to="/register">Register</Link>
         </li>
                {/* Show Login button if no token, else show Logout */}
                {!token ? (
                    <li><Link to="/login">Login</Link></li>
                ) : (
                    <li><button onClick={handleLogout}>Logout</button></li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
