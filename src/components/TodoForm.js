import React, { useState } from "react";
import axios from "axios";
import { BaseUrl } from "../constants";

function TodoForm({ onTodoAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent page reload

    const token = localStorage.getItem("Token"); // Get token from localStorage
    if (!token) {
      alert("⚠️ No token found! Please log in first.");
      return;
    }

    let data = {
      title: title,
      description: description,
    };

    let config = {
  method: "post",
  url: `${BaseUrl}/api/todos/create/`, // Adjusted URL for creating todos
  headers: {
        Authorization: `Token ${token}`,  // Ensure token is included in the headers
        "Content-Type": "application/json",
    },
    data: data,
};

    try {
    const response = await axios(config);
    console.log("Todo added:", response.data); // Log the response to ensure the todo was added
    onTodoAdded(); // Call onTodoAdded to fetch the updated list of todos
    setTitle(""); // Reset the form fields
    setDescription(""); // Reset the form fields
  } catch (error) {
    console.log(error);
  }
  }

  return (
    <div>
      <h2>Add Todo</h2>
      <form onSubmit={handleSubmit}> {/* Ensure onSubmit is set correctly */}
  <input
    type="text"
    placeholder="Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />
  <input
    type="text"
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />
  <button type="submit">Add Todo</button> {/* This button submits the form */}
</form>

    </div>
  );
}

export default TodoForm;
