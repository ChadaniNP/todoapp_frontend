import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./TodoForm"; // Import TodoForm

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null); // Track which todo is being edited

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

  // Set the todo that the user wants to edit
  const handleEditClick = (todo) => {
    setEditingTodo(todo);
  };

  const handleTodoAdded = (newTodo) => {
    setTodos([...todos, newTodo]);  // Add the new todo to the list
  };
   const handleTodoUpdated = (updatedTodo) => {
    setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
    setEditingTodo(null);  // Reset editing state
  };

  return (
    <div>
      <h2>Todo List</h2>
        <TodoForm
        fetchTodos={fetchTodos}
        editingTodo={editingTodo}
        onTodoAdded={handleTodoAdded}
        onTodoUpdated={handleTodoUpdated}
      />
      {/*<TodoForm onTodoAdded={fetchTodos} /> /!* Pass fetchTodos to TodoForm *!/*/}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong> - {todo.completed ? "✅" : "❌"}
                <button onClick={() => handleEditClick(todo)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
