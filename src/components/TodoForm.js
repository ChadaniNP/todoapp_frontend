import React, { useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../constants";

function TodoForm({
  fetchTodos,
  editingTodo,
  onTodoUpdated,
  onTodoAdded,
  setEditingTodo,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // If editingTodo exists, fill the form with the todo's current data
  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
    }
  }, [editingTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("Token");

    if (!token) {
      alert("⚠️ No token found! Please log in first.");
      return;
    }

    const data = { title, description };

    if (editingTodo) {
      // If editing, update the existing todo
      try {
        const response = await axios.put(
          `${BaseUrl}/api/todos/${editingTodo.id}/`,
          data,
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        onTodoUpdated(response.data); // Notify the parent component with the updated todo
      } catch (error) {
        console.log("Error updating todo:", error);
      }
    } else {
      // If adding new, create a new todo
      try {
        const response = await axios.post(`${BaseUrl}/api/todos/create/`, data, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });
        onTodoAdded(response.data); // Notify the parent component with the new todo
      } catch (error) {
        console.log("Error adding todo:", error);
      }
    }

    setTitle(""); // Clear form fields after submit
    setDescription("");
    setEditingTodo(null); // Reset editingTodo
    fetchTodos(); // Fetch the updated todo list
  };

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
