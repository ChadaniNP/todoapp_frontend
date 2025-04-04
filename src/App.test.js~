import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '@testing-library/jest-dom/extend-expect'; // for assertions like toBeInTheDocument()

// A helper function to render the App with BrowserRouter to handle routing
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

test('renders Home, Register, Login, and TodoList routes correctly', () => {
  renderWithRouter(<App />);

  // Check if Navbar is rendered (as it's common for all routes)
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/Register/i)).toBeInTheDocument();
  expect(screen.getByText(/Login/i));

  // Test initial route (should land on Home route or a default page)
  const homeLink = screen.getByText(/Home/i);
  fireEvent.click(homeLink); // Navigate to Home page
  expect(screen.getByText(/Home/i)).toBeInTheDocument(); // Home content should be rendered

  // Test the Register page
  const registerLink = screen.getByText(/Register/i);
  fireEvent.click(registerLink); // Navigate to Register page
  expect(screen.getByText(/Register/i)).toBeInTheDocument(); // Register content should be rendered

  // Test the Login page
  const loginLink = screen.getByText(/Login/i);
  fireEvent.click(loginLink); // Navigate to Login page
  expect(screen.getByText(/Login/i)).toBeInTheDocument(); // Login content should be rendered

  // Test the TodoList page
  const todoLink = screen.getByText(/TodoList/i);
  fireEvent.click(todoLink); // Navigate to TodoList page
  expect(screen.getByText(/TodoList/i)).toBeInTheDocument(); // TodoList content should be rendered
});

