import React, { useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../constants";

function TodoForm({ onTodoAdded, onTodoUpdated, editingTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // If editingTodo exists, set form values to the todo's current values
  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
    }
  }, [editingTodo]);

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent page reload

    const token = localStorage.getItem("Token"); // Get token from localStorage
    if (!token) {
      alert("⚠️ No token found! Please log in first.");
      return;
    }

    const data = { title, description };

    const config = {
      method: "post",
      url: `${BaseUrl}/api/todos/`, // Adjusted URL for flexibility
      headers: {
        Authorization: `Token ${localStorage.getItem("Token")}`, // Authorization header with token
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      // If editingTodo exists, make a PUT request to update the todo
      if (editingTodo) {
        const response = await axios.put(`${BaseUrl}/api/todos/${editingTodo.id}/`, data, {
          headers: { Authorization: `Token ${localStorage.getItem("Token")}` },
        });
        onTodoUpdated(response.data);  // Pass updated todo to parent component
      } else {
        // If no editingTodo, it means we are adding a new todo
        const response = await axios(config);
        onTodoAdded(response.data); // Pass new todo to parent component
      }

      // Reset form fields after submit
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error while adding/updating todo:", error);
    }
  }

  return (
    <div>
      <h2>{editingTodo ? "Edit Todo" : "Add Todo"}</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">{editingTodo ? "Update Todo" : "Add Todo"}</button>
      </form>
    </div>
  );
}

export default TodoForm;
