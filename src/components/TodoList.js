import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./TodoForm"; // Import TodoForm

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  // Fetch todos from backend
  const fetchTodos = async () => {
    try {
    const token = localStorage.getItem("Token");
console.log("Token:", token);  // Check if the token is correctly retrieved

const response = await axios.get("http://127.0.0.1:8000/api/todos/", {
    headers: { Authorization: `Token ${token}` },
});


      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  const addTodo = async (newTodo) => {
  // Optimistically add the new todo to the list
  setTodos([...todos, newTodo]);
};

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h2>Todo List</h2>
      <TodoForm onTodoAdded={fetchTodos} /> {/* Pass fetchTodos to TodoForm */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong> - {todo.completed ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
