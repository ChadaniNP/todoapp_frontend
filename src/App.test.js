import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Home, Register, Login, and TodoList routes correctly', () => {
  render(<App />);  // Just render App without additional BrowserRouter

  // Now check for elements related to different routes
  expect(screen.getByText(/Home/i)).toBeInTheDocument();  // Check if Home is rendered
  expect(screen.getByText(/Register/i)).toBeInTheDocument();  // Check if Register is rendered
  expect(screen.getByText(/Login/i)).toBeInTheDocument();  // Check if Login is rendered
  expect(screen.getByText(/TodoList/i)).toBeInTheDocument();  // Check if TodoList is rendered
});
