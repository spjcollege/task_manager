# Collaboration App

A full-stack React and Node.js collaboration platform for creating and managing teams and tasks. The backend uses Express and MongoDB (via Mongoose) to provide a REST API, while the frontend uses React with dynamic theming and smooth API integration.

## Features

- Create, edit, and delete teams (with member management)
- Create, mark as done, assign, and delete tasks
- Assign tasks to any team
- Live data sync with MongoDB Atlas backend
- Responsive interface with light/dark mode toggle
- Robust error handling for all API operations

## Project Structure

- `backend/`: Node.js + Express REST API with MongoDB and Mongoose
- `frontend/`: React client with API connectivity and UI components

## Setup Guide

### Backend

1. Enter backend folder:
    ```
    cd backend
    ```

2. Install dependencies:
    ```
    npm install
    ```

3. Create a `.env` file with:
    ```
    MONGODB_URI=your_mongodb_atlas_connection_string
    PORT=5000
    ```

4. Start backend server:
    ```
    node server.js
    ```
    Or for auto-reload:
    ```
    npx nodemon server.js
    ```

### Frontend

1. Enter frontend folder:
    ```
    cd frontend
    ```

2. Install dependencies:
    ```
    npm install
    ```

3. Start frontend dev server:
    ```
    npm start
    ```

## Usage

- Add teams and their members using the form.
- Add tasks, assign them to teams, and mark them as done.
- Delete and edit tasks/teams as needed.
- Toggle between light and dark UI modes.

## Technologies Used

- Backend: Express.js, MongoDB Atlas, Mongoose, dotenv, cors
- Frontend: React, Tailwind CSS
- State Management: useState, useEffect (React)
- API: RESTful endpoints

## Version Control

- Track only source code. Use `.gitignore` to exclude `node_modules`, `.env`, and environment secrets.

## License

MIT License

---

For any questions or feature requests, please open an issue or submit a pull request.