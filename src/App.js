import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList'; // Import the TodoList

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/*<Navbar /> /!* Always show Navbar with Logout button *!/*/}
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          {/* Add route for TodoList */}
          <Route path="/todos" element={<TodoList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
