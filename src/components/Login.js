import React, { useEffect, useState } from "react";
import { BaseUrl } from "../constants";
import axios from "axios";
import TodoList from "./TodoList";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Err, setErr] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if there is a token in localStorage when the component mounts
    const token = localStorage.getItem("Token");
    if (token) {
      setIsLoggedIn(true); // If token exists, user is logged in
    }
  }, []);

  // Handle login
  const login = () => {
    axios
      .post(`${BaseUrl}/api/login/`, { username, password })
      .then((response) => {
        localStorage.setItem("Token", response.data.token);
        setErr("✅ Logged in successfully!");
        setIsLoggedIn(true); // Update state to logged in
      })
      .catch((error) => {
        console.log(error);
        setErr(error.response?.data || "Login failed.");
      });
  };

  // Handle logout
  const logout = () => {
    localStorage.removeItem("Token"); // Remove the token from localStorage
    setIsLoggedIn(false); // Update state to logged out
    setUsername(""); // Reset username and password fields
    setPassword("");
    setErr("👋 Logged out.");
  };

  return (
    <div>
      {!isLoggedIn ? (
        <>
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login}>Login</button>
          <p>{Err}</p>
        </>
      ) : (
        <>
          <button onClick={logout}>🚪 Logout</button>
          <TodoList />
        </>
      )}
    </div>
  );
}

export default Login;
