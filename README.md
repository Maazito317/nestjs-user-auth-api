# NestJS User Auth API

A full-featured backend API built with **NestJS**, **TypeORM**, and **PostgreSQL**, supporting JWT-based authentication, secure refresh tokens, and full user CRUD.

---

## 🚀 Features

- ✅ JWT-based Authentication (Access + Refresh Tokens)
- 🔐 Protected routes via Guards (`/auth/profile`, `/users`)
- 🧑‍💼 User CRUD operations (`/users`, `/users/:id`)
- 🧂 Password hashing with `bcrypt`
- 📦 DTO-based request validation with `class-validator`
- 🔁 Refresh Token support with hash comparison
- 🔒 Passwords and tokens are never returned in API responses

---

## 📦 Tech Stack

- **NestJS** — Modular backend framework
- **TypeORM** — ORM for PostgreSQL
- **PostgreSQL** — Relational database
- **Passport.js + JWT** — Token-based auth
- **class-validator** — DTO validation
- **bcrypt** — Secure password hashing

---

## 🛠️ Getting Started

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

## 🧩 Database Setup

Make sure PostgreSQL is installed and running.

Create a database (or use the provided `DATABASE_NAME`):

```bash
createdb test
```

Enable UUID extension in psql:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

---

### 3. Environment Configuration

Create a `.env` file in the project root (see `.env.example` for reference):

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=test

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
```

---

## 📮 API Endpoints

### 🔐 Auth

| Method | Endpoint           | Description                        |
|--------|--------------------|------------------------------------|
| POST   | `/auth/signup`     | Register a new user                |
| POST   | `/auth/login`      | Login, returns access + refresh    |
| GET    | `/auth/profile`    | Get current user (JWT required)    |
| POST   | `/auth/refresh`    | Exchange refresh for access token  |

### 👤 Users (Protected with JWT)

| Method | Endpoint           | Description                 |
|--------|--------------------|-----------------------------|
| GET    | `/users`           | Get all users               |
| GET    | `/users/:id`       | Get user by ID              |
| PUT    | `/users/:id`       | Update user                 |
| DELETE | `/users/:id`       | Delete user                 |

---

## 🧪 Sample Usage

### Register
```bash
curl -X POST http://localhost:3000/auth/signup   -H "Content-Type: application/json"   -d '{"email":"user@example.com","password":"secret123","firstName":"John","lastName":"Doe"}'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login   -H "Content-Type: application/json"   -d '{"email":"user@example.com","password":"secret123"}'
```

### Refresh Token
```bash
curl -X POST http://localhost:3000/auth/refresh   -H "Content-Type: application/json"   -d '{"refreshToken":"<your_refresh_token_here>"}'
```

---

## 📌 Notes

- Passwords are hashed with `bcrypt` and never returned
- All token-protected routes use a custom JWT Guard
- Refresh tokens are hashed and stored securely in DB
- Transactions will be useful to protect future multi-entity workflows

---

## 🧹 To Do (Future Enhancements)

- [ ] Add Swagger documentation with `@nestjs/swagger`
- [ ] Add integration/unit tests with Jest
- [ ] Add token invalidation/blacklist logic
- [ ] Add role-based access control

---

## 🧑‍💻 Author

Built by Muhammad Maaz Khan — open to feedback and collaboration!
