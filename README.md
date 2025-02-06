# Fullstack Todolist Backend

## Project Overview

This is a simple Todo List backend that handles basic CRUD operations with authentication. The backend uses a **PostgreSQL** database, running locally for this exercise. The API is documented with **Swagger**.

### Authentication

- Users authenticate via **JSON Web Tokens (JWT)**.
- The database contains a **users** table storing email addresses and hashed passwords.
- When logging in, credentials are validated, and a **JWT** is issued containing user information.

### CRUD Operations

- Users can **create, read, update, and delete** their own todos.
- Each todo is linked to a specific user.
- **JWT authentication and middleware** ensure users can only modify their own todos.

---

## Instructions to Run the Project Locally

### 1. Clone the Repository

```sh
git clone git@github.com:juan-osorio15/fullstack_todolist.git
```

### 2. Navigate to the Backend Folder

```sh
cd fullstack_todolist/backend
```

### 3. Install Dependencies

```sh
npm install
```

### 4. Create a `.env` File in the Backend Folder

Define the **PostgreSQL configuration**, server port, and JWT secret:

```env
PORT=8000
DB_URL="postgres://{your_user}:{your_password}@localhost:{your_port}/todolist"
DB_USER=your_user
DB_HOST="localhost"
DB_NAME="todolist"
DB_PASSWORD={your_password}
DB_PORT=5432
JWT_SECRET=generate_a_secure_secret
```

### 5. Create the Database in PostgreSQL

```sql
CREATE DATABASE todolist;
```

### 6. Create the Required Tables

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    todo VARCHAR(255) NOT NULL,
    status BOOLEAN DEFAULT false,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 7. Run the Server

For **development**:

```sh
npm run dev
```

For **production**:

```sh
npm run build
npm start
```

### 8. Read API Endpoints Documentation

Open in your browser:

```
http://localhost:8000/api-docs
```

---

## Observations

Initially, I planned to make this a **fullstack** app with a frontend. However, as I progressed with the **Next.js frontend**, I realized I was not utilizing **TypeScript** effectively. I implemented my **own authentication with JWT**, leading to extra work becasue my initial plan was to store the JWT in **localStorage** and use it for protected routes.If I started this project again, I would use a library like Next Auth. In general, **TypeScript revealed multiple issues** with the way that I was building the frontend which I don't know how to fix yet.

### Challenges Faced:

- I know the basics of TypeScript but had never used it in a fullstack project.
- Setting up **React types** and Next.js **type configurations** was challenging.
- Propper planning and type definitions have to be done at the beginning of the project, not whenever issues appear

I now recognize that I need to **deepen my understanding of TypeScript** in fullstack applications before continuing with the frontend and in order to take full advantage of it in the backend.
