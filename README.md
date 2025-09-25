# Collaboration App

A React and Node.js based collaboration application that allows managing teams and tasks. The backend is powered by Express and MongoDB with Mongoose for data persistence, while the frontend uses React with a dark mode toggle.

## Features

- Create, update, and delete teams with member management.
- Create, update, and delete tasks with assignment to teams.
- Data persistence with MongoDB Atlas cloud database.
- RESTful API backend serving all data operations.
- Responsive UI with dark/light theme toggle.

## Project Structure

- `/backend`: Node.js Express server with REST APIs and MongoDB integration.
- `/frontend`: React-based user interface interacting with backend APIs.

## Setup and Installation

### Backend

1. Create a `.env` file inside `/backend` with the following content:

   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the backend server:

   ```
   node server.js
   ```

### Frontend

1. Navigate to `/frontend` and install dependencies:

   ```
   npm install
   ```

2. Start the frontend development server:

   ```
   npm start
   ```

Ensure that backend is running on port 5000 (or update API URLs in frontend if changed).

## Usage

- Add teams and members using the Add Team form.
- Add tasks via the Add Task form.
- Assign tasks to teams and mark tasks as done.
- Toggle between light and dark modes.

## Technologies Used

- Backend: Node.js, Express, MongoDB, Mongoose, dotenv, CORS
- Frontend: React, Tailwind CSS, React Router (optional)
- Database: MongoDB Atlas (cloud database service)

## Contributing

Contributions are welcome. Please fork the repository and submit pull requests for bug fixes or new features.

## License

This project is licensed under the MIT License.
