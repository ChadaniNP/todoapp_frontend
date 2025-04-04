import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./TodoForm";
import { BaseUrl } from "../constants";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);  // To handle editing

  // Fetch Todos from API
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch the todo list from the API
  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.get(`${BaseUrl}/api/todos/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Handle when Edit button is clicked
  const handleEditClick = (todo) => {
    setEditingTodo(todo); // Populate the form with the selected todo for editing
  };

  // Handle deletion of a todo
  const handleDelete = async (todoId) => {
    try {
      const token = localStorage.getItem("Token");
      await axios.delete(`${BaseUrl}/api/todos/${todoId}/delete/`, {
        headers: { Authorization: `Token ${token}` },
      });

      // Remove todo from local state immediately after deletion
      setTodos(todos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Update todo in the list after editing
  const handleTodoUpdated = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    setEditingTodo(null); // Clear editing state after updating
  };

  // Handle marking a todo as complete (Checkbox click)
  const handleToggleComplete = async (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === todo.id ? updatedTodo : t))
    );

    try {
      const token = localStorage.getItem("Token");
      await axios.put(`${BaseUrl}/api/todos/${todo.id}/`, updatedTodo, {
        headers: { Authorization: `Token ${token}`, "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Failed to update. Please try again.");
      fetchTodos(); // Re-fetch the list if something goes wrong
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <TodoForm
        editingTodo={editingTodo}
        onTodoAdded={(newTodo) => setTodos((prevTodos) => [...prevTodos, newTodo])}
        onTodoUpdated={handleTodoUpdated} // Pass the onTodoUpdated handler
        fetchTodos={fetchTodos}
        setEditingTodo={setEditingTodo} // Pass the setEditingTodo function to reset after update
      />

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo)}
            />
            <strong>{todo.title}</strong> - {todo.description}
            <button onClick={() => handleEditClick(todo)}>Edit</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
