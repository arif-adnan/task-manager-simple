# Simple Task Management System

This is a simple task management system implemented using Node.js, Express.js, and MongoDB. It allows CRUD operations (Create, Read, Update, Delete) on tasks.

## Table of Contents

- [Setup and Installation](#setup-and-installation)
- [Task API Documentation](task-api-documentation)
- [Project Structure](#project-structure)
- [Technologies Used](#technology-used)

# Setup and Installation

## Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed locally or accessible remotely

### Installation Steps

1. **Clone the repository:**
   git clone https://github.com/arif-adnan/task-manager-simple.git
   cd <project_directory>

2. **Install dependencies:**
   npm install

3. **Create a .env file:**

Create a `.env` file in the root of your project and add the following information:

```
PORT=8000
DATABASE=your_mongo_connection_uri
```

4. **Start the server:**

   ```bash
   node/nodemon start
   ```

   Access the application in a web browser at `http://localhost:8000`.

# Task API Documentation

### Task Model

- **title**: Title of the task
- **description**: Description of the task
- **status**: Current status of the task
- **dueDate**: Due date of the task

### Endpoints

### Create a new task

```http
POST /api/v1/tasks
```

#### Demo Request

```json
{
  "title": "Task 7",
  "description": "Description for Task 7 goes here.",
  "status": "completed",
  "dueDate": "2023-12-15T15:00:37.091Z"
}
```

### Fetch all tasks from the database

```http
GET /api/v1/tasks
```

#### Demo Response

```json
{
  "tasks": [
    {
      "_id": "65620805bc6fc1b9256aebe9",
      "title": "Task 1 updated",
      "description": "Description for Task 1 updated.",
      "status": "completed",
      "dueDate": "2023-12-10T00:00:00.000Z",
      "createdAt": "2023-11-25T14:43:17.876Z",
      "updatedAt": "2023-11-25T15:10:05.187Z",
      "__v": 0
    },
    {
      "_id": "65620805bc6fc1b9256aebea",
      "title": "Task 2",
      "description": "Description for Task 2 goes here.",
      "status": "in-progress",
      "dueDate": null,
      "createdAt": "2023-11-25T14:43:17.876Z",
      "updatedAt": "2023-11-25T14:43:17.876Z",
      "__v": 0
    }
  ]
}
```

### Fetch a single task by its id

```http
GET /api/v1/tasks/:id
```

#### Demo Response

```json
{
  "task": {
    "_id": "65620805bc6fc1b9256aebe9",
    "title": "Task 1 updated",
    "description": "Description for Task 1 updated.",
    "status": "completed",
    "dueDate": "2023-12-10T00:00:00.000Z",
    "createdAt": "2023-11-25T14:43:17.876Z",
    "updatedAt": "2023-11-25T15:10:05.187Z",
    "__v": 0
  }
}
```

### Update a task by its id

```http
PUT /api/v1/tasks/:id
```

#### Demo Request

```json
{
  "description": "Description for Task 1 updated.",
  "status": "completed",
  "dueDate": "2023-12-10"
}
```

### Delete a task by its id

```http
DELETE /api/v1/tasks/:id
```

#### Demo Response

```json
{
  "message": "Task 6 has been deleted"
}
```

## Error Handling

The API handles errors including:

- Task not found
- Invalid task data
- Other potential errors

## Testing

Postman Documentation: `https://documenter.getpostman.com/view/24081332/2s9YeD9DRs`

# Project Structure

```plaintext
project-root/
│
├── controllers/
│ ├── tasks.js
│
├── db/
│ ├── connect.js
│
├── errors/
│ ├── custom-error.js
│
├── middleware/
│ ├── async_js.js
│ ├── error-handler.js
│ ├── not-found.js
│
├── models/
│ ├── task.js
│
├── public/
│
├── routes/
│ ├── task.js
│
├── .env
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
└── README.md
```

# Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
