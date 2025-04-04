import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./TodoForm";
import { BaseUrl } from "../constants";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch Todos
  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.get(`${BaseUrl}/api/todos/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
    setIsLoading(false);
  };

  // Handle Edit Click - Prefills the form with existing todo data
  const handleEditClick = (todo) => {
    setEditingTodo(todo); // Set the todo being edited
  };

  // Handle Delete (Optimistic UI Update)
  const handleDelete = async (todoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId)); // Instantly remove from UI

    try {
      const token = localStorage.getItem("Token");
      await axios.delete(`${BaseUrl}/api/todos/${todoId}/delete/`, {
        headers: { Authorization: `Token ${token}` },
      });
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("Failed to delete. Please try again.");
      fetchTodos(); // Fetch fresh data if deletion fails
    }
  };

  // Handle Completion Toggle (Checkbox)
  const handleToggleComplete = async (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };

    // Optimistically update UI
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === todo.id ? updatedTodo : t))
    );

    try {
      const token = localStorage.getItem("Token");
      await axios.put(`${BaseUrl}/api/todos/${todo.id}/update/`, updatedTodo, {
        headers: { Authorization: `Token ${token}`, "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Failed to update. Please try again.");
      fetchTodos(); // Fetch fresh data if update fails
    }
  };

  const handleTodoUpdated = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    setEditingTodo(null); // Reset editing mode
  };

  return (
    <div>
      <h2>Todo List</h2>
      <TodoForm
        fetchTodos={fetchTodos}
        editingTodo={editingTodo} // Pass editingTodo to the form
        onTodoUpdated={handleTodoUpdated} // Handle todo update
        onTodoAdded={(newTodo) => setTodos((prev) => [...prev, newTodo])}
        setEditingTodo={setEditingTodo} // Allow clearing after update
      />

      {isLoading ? <p>Loading todos...</p> : null}

      <ul className="todo-list">
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
