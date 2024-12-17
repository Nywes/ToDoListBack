# ToDo List Project - Backend Application

This project is a backend application for managing tasks, built with Nest.js.

## Getting Started

### 1. Install Dependencies

First, install the required dependencies by running:

```
npm install
```

This will install all the necessary packages from the `package.json` file.

### 2. Configure the Database

This backend application uses `PostgreSQL` as its database. Follow these steps to configure the database connection:

1. Install PostgreSQL (if not already installed):

- Follow the official documentation for installation: PostgreSQL Installation Guide

2. Start PostgreSQL

- If PostgreSQL is not running, start it with the following command (based on your system):

  For Linux:

  ```
  sudo service postgresql start
  ```

  For macOS (using Homebrew):

  ```
  brew services start postgresql
  ```

  For Windows, ensure that PostgreSQL is running via the
  Services panel or using pg_ctl.


3. Create a Database:

- Create a new PostgreSQL database. For example, create a database named todo:

```bash
createdb todo
```

4. Configure Database Connection:

- In the root of the project, create a .env file to store your database credentials.

- Add the following environment variables to the .env file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=todo
```

- Replace your_password with the password you set for your PostgreSQL user.

5. Check the Connection:

- The application is set to automatically use these environment variables from the .env file. Ensure that the database connection is working correctly before running the application.

### 3. Run the Development Server

Once dependencies are installed, you can start the development server:

```
npm run start:dev
```

The server will run on [http://localhost:3000](http://localhost:3000), where you can test the API.

## Available Scripts

In the project directory, you can run:

### `npm run start`

Starts the server in production mode.

### `npm run start:dev`

Runs the server in watch mode for development, automatically reloading on code changes.

### `npm run start:prod`

Starts the server in production mode after building the app.

### `npm run test`

Runs the unit tests for the backend application.

### `npm run test:e2e`

Runs end-to-end tests.

### `npm run test:cov`

Generates a test coverage report.

## Project Structure

- `src/` - Contains the main application files.
  - `app.module.ts` - Main app module containing all the imports and declarations.
  - `tasks/` - Contains task-related logic, including controllers, services, and entities.

## API Endpoints

This backend provides several API endpoints for task management:

### **GET /tasks**

- **Description**: Fetches a list of all tasks.
- **Response**: A list of task objects containing `id`, `title`, `description`, `status`, `createdAt`, and `updatedAt`.

### **GET /tasks/:id**

- **Description**: Fetches a specific task by its ID.
- **Response**: A task object containing `id`, `title`, `description`, `status`, `createdAt`, and `updatedAt`.

### **POST /tasks**

- **Description**: Creates a new task.
- **Request Body**:

```
  {
  "title": "string",
  "description": "string"
  }
```

- **Response**: The created task object with `id`, `title`, `description`, `status`, `createdAt`, and `updatedAt`.

### **PATCH /tasks/:id**

- **Description**: Updates an existing task by its ID.
- **Request Body**:

```
  {
  "title": "string",
  "description": "string",
  "status": "string"
  }
```

- **Response**: The updated task object with `id`, `title`, `description`, `status`, `createdAt`, and `updatedAt`.

### **DELETE /tasks/:id**

- **Description**: Deletes a task by its ID.
- **Response**: A status message indicating success or failure.

## Architecture Overview

- **Backend (Nest.js)**: This application uses Nest.js, a Node.js framework built with TypeScript. It provides a modular structure and decorators for defining controllers, services, and modules.
- **State Management**: The backend handles state and data flow using services and repositories to manage tasks in a database.
- **Routing**: Nest.js uses decorators like `@Get()`, `@Post()`, `@Patch()`, and `@Delete()` to define API routes within controllers.
- **Database**: The application interacts with a database to store and retrieve tasks. The choice of database depends on your configuration (e.g., PostgreSQL, MongoDB).
- **Testing**: Unit and e2e tests are provided to ensure the application's functionality and correctness. The testing framework is built on top of Jest.

## License

Nest is [MIT licensed](LICENSE).
