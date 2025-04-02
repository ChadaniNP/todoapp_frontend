import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./TodoForm";
import { BaseUrl } from "../constants";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

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

  const handleEditClick = (todo) => {
    setEditingTodo(todo);
  };

const handleDelete = async (todoId) => {
  const token = localStorage.getItem("Token"); // Get auth token
  if (!token) {
    alert("⚠️ No token found! Please log in first.");
    return;
  }

  try {
    await axios.delete(`${BaseUrl}/api/todos/${todoId}/delete/`, {
      headers: { Authorization: `Token ${token}` },
    });

    // Remove the deleted todo from the state
    setTodos(todos.filter(todo => todo.id !== todoId));

  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};


  return (
    <div>
      <h2>Todo List</h2>
      <TodoForm
        fetchTodos={fetchTodos}
        editingTodo={editingTodo}
        onTodoAdded={newTodo => setTodos([...todos, newTodo])}
        onTodoUpdated={updatedTodo => setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo))}
      />
      <ul>

  {todos.map((todo) => (
    <li key={todo.id}>
      <strong>{todo.title}</strong> - {todo.completed ? "✅" : "❌"}
      <button onClick={() => handleEditClick(todo)}>Edit</button>
      <button onClick={() => handleDelete(todo.id)}>Delete</button> {/* Delete button */}
    </li>
  ))}
</ul>

    </div>
  );
};

export default TodoList;
