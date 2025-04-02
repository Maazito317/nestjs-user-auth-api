# NestJS User Auth API

A backend API built with NestJS, PostgreSQL, and TypeORM that supports JWT-based authentication and user management (CRUD).

---

## 🚀 Features

- ✅ JWT authentication (`/auth/signup`, `/auth/login`)
- 🔐 Protected routes using Guards (`/auth/profile`)
- 🧑‍💼 User CRUD endpoints (`/users`, `/users/:id`)
- �� Password hashing with bcrypt
- ✅ Validation with DTOs and class-validator
- 🔒 Passwords are never returned from API responses

---

## 📦 Tech Stack

- **NestJS**
- **TypeORM**
- **PostgreSQL**
- **Passport.js + JWT**
- **class-validator**
- **bcrypt**

---

## 📁 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/nestjs-user-auth-api.git
cd nestjs-user-auth-api
```

### 2. Install dependencies

```bash
npm install
```
---

## 🛠️ Database Setup

Make sure PostgreSQL is installed and running.

Create a database named `test` (or update the name in `.env`):

```bash
createdb test


### 3. Create `.env` file

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=your_db_name

JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1h
```

Also copy this template to `.env.example` for collaborators.

### 4. Start the app

```bash
npm run start:dev
```

---

## 🧪 API Endpoints

### 🔐 Auth

- `POST /auth/signup` → Create a new user
- `POST /auth/login` → Log in and get a JWT
- `GET /auth/profile` → Get user profile (requires Bearer token)

### 👥 Users (protected)

- `GET /users` → List all users
- `GET /users/:id` → Get a user by ID
- `PUT /users/:id` → Update user info
- `DELETE /users/:id` → Remove user

---

## 🔒 Notes

- Passwords are hashed using bcrypt (`@Column({ select: false })`)
- Tokens are signed using a secret key defined in `.env`
- All user routes are protected by JWT Auth Guards

---

## 📜 License

MIT