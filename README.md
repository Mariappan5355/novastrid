
# **Node System Test**

This application provides APIs to user register, authentication, import chat data from an Excel file and filter tasks based on their status. It uses Node.js, Express, and MySQL for the backend.

## **Prerequisites**

- Node.js (v14 or above)
- MySQL Database
- NPM (Node Package Manager)

## **Setup Instructions**

### **1. Clone the repository**

```bash
git clone https://github.com/Mariappan5355/novastrid
cd novastrid
```

### **2. Install Dependencies**

Run the following command to install all required dependencies:

```bash
npm install
```

### **3. Set up MySQL Database**


  
- Create a database and tables required for the application. You can run the following SQL commands:

```sql
CREATE DATABASE chat_app;

USE chat_app;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE chat_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  message TEXT NOT NULL,
  timestamp DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status ENUM('pending', 'completed') NOT NULL
);
```

- Replace the connection details in the `.env` file.

### **4. Set up Environment Variables**

Create a `.env` file in the root of the project and add the following variables or copy the `.env.example` file and update the varibales:

```bash
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=chat_app
JWT_SECRET=your_jwt_secret
PORT=3000
```

### **5. Run the Application**

Once the dependencies are installed and the database is set up, you can run the application using:

```bash
npm run dev
```

This will start the application on `http://localhost:3000`.

### **6. API Endpoints**

#### **1. Register User (POST)**
- **Endpoint**: `api/auth/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Body**:
  - `userName`: (string) Required
  - `email`: (string) Required
  - `password`: (string) Required
- **Example**:
  ```bash
  curl -X POST http://localhost:3000/api/auth/register -d '{"user_name": "maari", "email": "mari@example.com", "password": "password123"}' -H "Content-Type: application/json"
  ```

#### **2. Login User (POST)**
- **Endpoint**: `api/auth/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns a JWT token.
- **Body**:
  - `email`: (string) Required
  - `password`: (string) Required
- **Example**:
  ```bash
  curl -X POST http://localhost:3000/api/auth/login -d '{"email": "mari@example.com", "password": "password123"}' -H "Content-Type: application/json"
  ```

#### **3. Import Chat Data (POST)**
- **Endpoint**: `api/chat/import-chat`
- **Method**: `POST`
- **Description**: Imports chat data from an Excel file.
- **File Field**: `file` (Excel file containing chat data)
- **Authorization**: Bearer `<your-jwt-token>`
- **Example**:
 ```bash
  curl -X POST http://localhost:3000/api/chat/import-chat \
  -H "Authorization: Bearer <your-jwt-token>" \
  -F "file=@path_to_your_file.xlsx"
  ```

#### **4. Get Filtered Tasks (GET)**
- **Endpoint**: `api/chat/tasks`
- **Method**: `GET`
- **Query Parameters**:
  - `filter`: Optional, can be `completed` or `pending`
- **Authorization**: Bearer `<your-jwt-token>`
- **Example**:
  ```bash
    curl http://localhost:3000/api/chat/tasks?filter=completed \
    -H "Authorization: Bearer <your-jwt-token>"
  ```


---

## **Project Structure**

```
├── controllers
│   ├── chat.controller.ts
│   ├── auth.controller.ts
├── services
│   ├── chat.service.ts
│   ├── auth.service.ts
├── models
│   ├── user.model.ts
│   ├── chat.model.ts
│   ├── task.model.ts
├── database
│   └── connection.ts
├── routes
│   ├── auth.routes.ts
│   ├── chat.routes.ts
├── middlewares
│   └── verifyToken.middleware.ts
├── .env
├── .app.ts
├── .env.example
├── package.json
├── README.md
└── tsconfig.json
```

----

This README should guide you through running this application locally with MySQL. 
