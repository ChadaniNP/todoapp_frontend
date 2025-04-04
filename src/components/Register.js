import React, { useState } from "react";
import Home from "./Home"; // Make sure Home is imported correctly
import { BaseUrl } from "../constants";
import axios from "axios";
import Navbar from "./Navbar";

function Register(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(""); // Changed to lowercase for consistency
  const [successMessage, setSuccessMessage] = useState(""); // New state for success messages

  // Handle input changes
  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  // Register function
  const register = () => {
    if (username === "" || email === "" || password === "") {
      setErr("⚠️ Please enter all fields.");
      setSuccessMessage(""); // Clear success message
    } else {
      const data = JSON.stringify({
        username,
        email,
        password,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BaseUrl}/api/register/`, // Ensure correct URL
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log("Registration successful:", response.data);
          setErr(""); // Clear error message on success
          setSuccessMessage("✅ Registration successful! Please log in.");
        })
        .catch((error) => {
          console.error("Error during registration:", error);
          setSuccessMessage(""); // Clear success message on error
          setErr(error.response?.data || "❌ Registration failed. Please try again.");
        });
    }
  };

  return (
    <div>
      {/*<Navbar /> /!* Ensure Home component is working properly *!/*/}
      <h1>Register</h1>

      {/* Registration form */}
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={usernameChangeHandler}
          placeholder="Enter username"
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={emailChangeHandler}
          placeholder="Enter email"
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={passwordChangeHandler}
          placeholder="Enter password"
        />
      </div>

      <button onClick={register}>Register</button>

      {/* Display error or success messages */}
      {err && <p style={{ color: "red" }}>{err}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
}

export default Register;
