import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../constants";

function Logout() {
    const navigate = useNavigate(); // To redirect user after logout

    function handleLogout() {
        const token = localStorage.getItem("Token");

        if (!token) {
            alert("⚠️ You are not logged in!");
            navigate("/login"); // Redirect to login if not logged in
            return;
        }

        axios.post(`${BaseUrl}/api/logout/`, {}, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
        .then(() => {
            localStorage.removeItem("Token");  // ✅ Remove token from local storage
            alert("✅ Logged out successfully!");
            navigate("/login");  // ✅ Redirect to login page
        })
        .catch(error => {
            console.error("❌ Logout error:", error);
            alert("❌ Failed to logout!");
        });
    }

    return (
        <div>
            <h2>Logout</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;
