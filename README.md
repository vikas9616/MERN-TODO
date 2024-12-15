# MERN To-Do Application

A full-stack To-Do application built using the **MERN** stack (MongoDB, Express.js, React.js, Node.js) that allows users to efficiently manage their tasks with features like adding, editing, and deleting to-dos.

---

## Features

- **Create**: Add new to-do tasks with ease.
- **Read**: View your list of tasks in an organized manner.
- **Update**: Modify tasks when needed.
- **Delete**: Remove completed or irrelevant tasks.
- **Responsive Design**: User-friendly interface optimized for different screen sizes.
- **API Integration**: Backend APIs for task management.

---

## Tech Stack

### Frontend:
- **React.js**: For creating the interactive user interface.
- **CSS**: For styling the application.

### Backend:
- **Node.js**: Runtime environment.
- **Express.js**: Framework for handling API routes.

### Database:
- **MongoDB**: For storing to-do tasks.

### Tools:
- **Mongoose**: For object data modeling (ODM) with MongoDB.

---

## Installation

### Prerequisites
- Node.js installed on your system.
- MongoDB instance running locally or remotely.

### Steps

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/vikas9616/MERN-TODO.git
    ```

2. **Navigate to the Project Directory**:
    ```bash
    cd MERN-TODO
    ```

3. **Install Dependencies**:
   - For Backend:
     ```bash
     cd backend
     npm install
     ```
   - For Frontend:
     ```bash
     cd frontend
     npm install
     ```

4. **Start the Application**:
   - Start the Backend:
     ```bash
     cd backend
     npm start
     ```
   - Start the Frontend:
     ```bash
     cd frontend
     npm start
     ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

---

## Folder Structure

```plaintext
MERN-TODO/
├── backend/      # Backend server code (Node.js + Express.js)
├── frontend/     # Frontend React application
├── README.md     # Project documentation
└── .gitignore    # Ignored files for Git
```

---

## API Endpoints

### Base URL: `/api/todos`

- **GET** `/`: Fetch all tasks.
- **POST** `/`: Add a new task.
- **PUT** `/:id`: Update a task by ID.
- **DELETE** `/:id`: Delete a task by ID.

---


---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Commit your changes and push to your branch.
4. Open a pull request with a description of your changes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- Built with the MERN stack.
- Thanks to the open-source community for inspiration and tools.

---


