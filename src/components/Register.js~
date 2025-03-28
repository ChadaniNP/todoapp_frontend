import React, {useState} from 'react';
import Home from "./Home";
import {BASEURL} from "../constants";
import axios from "axios";

function Register(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Err, setErr] = useState("");

function usernameChangeHandler(event) {
    setUsername(event.target.value);
}
function emailChangeHandler(event) {
    setEmail(event.target.value);
}
function passwordChangeHandler(event) {
    setPassword(event.target.value);
}

function register(){
    if (username === "" || email === "" || password === "") {
        setErr("All fields are required");
    }
    else {
let data = JSON.stringify({
  "username": username,  // Use the actual state value
  "email": email,
  "password": password
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: BASEURL+'/api/register/',
  headers: {
    'Content-Type': 'application/json',
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  setErr("Registered Successfully");
})
.catch((error) => {
  console.log(error);
  setErr(error.response.data);
});
    }
}

    return  (
        <div>
            <Home/>
            <h1>Register</h1>
            <p>Username<input type="text" placeholder="Username" onChange={usernameChangeHandler}/></p>
            <p>Email<input type="email" placeholder="Email" onChange={emailChangeHandler}/></p>
            <p>Password<input type="password" placeholder="Password" onChange={passwordChangeHandler}/></p>
            <button onClick={register}>Register</button>
            <p>{Err}</p>
        </div>
    );
}
    export default Register;
