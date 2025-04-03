# To-Do List Application

This is a full-stack **To-Do List application** built using **React (Frontend)** and **Django REST Framework (Backend)**. The application allows users to **register, log in, create, update, and delete tasks** while maintaining user authentication.

## Features

- **User Authentication** (Register, Login, Logout)
- **Create, Read, Update, and Delete (CRUD) operations** for tasks
- **Token-based Authentication** using Django REST Framework
- **Responsive UI** with React
- **Integration with PostgreSQL database**

## Tech Stack

### Frontend
- React (JavaScript)
- React Hooks
- Axios (for API calls)
- Tailwind CSS (for styling)

### Backend
- Django REST Framework
- PostgreSQL
- Django Authentication with DRF Tokens
- Django ORM

## Installation & Setup

### Prerequisites
- Node.js & npm
- Python & pip
- PostgreSQL Database

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app/backend
   ```
2. Create a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Apply database migrations:
   ```sh
   python manage.py migrate
   ```
5. Run the Django development server:
   ```sh
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React application:
   ```sh
   npm start
   ```
4. Open your browser and visit: [http://localhost:3000](http://localhost:3000)

## API Endpoints

| Method | Endpoint                | Description                |
|--------|--------------------     |----------------------------|
| POST   | /api/register/          | Register a new user        |
| POST   | /api/login/             | Log in a user              |
| GET    | /api/todos/             | Get all tasks              |
| POST   | /api/todos/create/      | Create a new task          |
| PUT    | /api/todos/{id}/        | Update a specific task     |
| DELETE | /api/todos/{id}/delete  | Delete a specific task     |

## Running Tests

### Backend Tests (Django)
Run tests using:
```sh
pytest
```

### Frontend Tests (React)
Run tests using:
```sh
npm test
```

## Deployment

### Backend Deployment (Vercel or Render)
- Configure **`DATABASE_URL`** and **`SECRET_KEY`** as environment variables.
- Use **`gunicorn`** as the WSGI server.

### Frontend Deployment (Vercel)
- Push your React project to GitHub.
- Connect Vercel to your repository and deploy.

## CI/CD Integration
- **GitHub Actions** or **CircleCI** for testing and automatic deployment.
- **Linting and formatting checks** before merging code.

## Contributors
- Chadani Shilpakar

