import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import '@testing-library/jest-dom';

describe('Todo App Routing', () => {
  test('renders Home page on "/" route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    // expect(screen.getByText(/home/i)).toBeInTheDocument();
  });

  test('renders Register page on "/register" route', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });

  test('renders Login page on "/login" route', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('renders TodoList page on "/todos" route', () => {
    render(
      <MemoryRouter initialEntries={['/todos']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/todos/i)).toBeInTheDocument(); // Adjust to match your heading
  });
});
