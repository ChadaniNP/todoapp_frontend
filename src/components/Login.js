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
    if (localStorage.getItem("Token")) {
      setIsLoggedIn(true);
    }
  }, []);

  function login() {
    axios.post(`${BaseUrl}/api/login/`, { username, password })
      .then((response) => {
       localStorage.setItem("Token", response.data.token);
        setErr("✅ Logged in successfully!");
        setIsLoggedIn(true);  // ✅ Update state to show TodoList
      })
      .catch((error) => {
        console.log(error);
        setErr(error.response?.data || "Login failed.");
      });
  }

  return (
    <div>
      {!isLoggedIn ? (
        <>
          <h1>Login</h1>
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={login}>Login</button>
          <p>{Err}</p>
        </>
      ) : (
        <TodoList />  // ✅ Show TodoList after login
      )}
    </div>
  );
}

export default Login;
