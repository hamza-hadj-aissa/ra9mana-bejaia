# NestJS Auth JWT Boilerplate

## Description

This project is a boilerplate for a NestJS application with Prisma ORM. The application has the following features:

- User authentication with JWT
- User authorization with roles
- User management
- Change user password
- Refresh access token

## Setup

To run this project, you need to have Node.js installed on your machine. Clone the repository and run the following commands:

1. Install the dependencies:
   This project is a boilerplate for a NestJS application with Prisma ORM.

## Setup

To run this project, you need to have Node.js installed on your machine. Clone the repository and run the following commands:

1. Install the dependencies:

```bash
npm install
```

2. Run postgeSQL database instance with docker:

```bash
docker-compose up -d
```

The database will be available on `localhost:5432` with the following credentials:

- User: `postgres`
- Password: `password`
- Database: `nestjs-auth-jwt-boilerplate-db`

You can change these values in the '.env.development' file.

3. Run this command to:

- Run the migrations
- Seed the database with some data
- Start the application

```bash
npm run start:migrate:dev
```

## Architecture

The project is divided into the following modules:

- **App**: Contains the application logic.
- **Database**: Contains the database logic. (Prisma ORM)
- **Auth**: Contains the authentication logic.
- **Users**: Contains the user logic.
- **AuthTokens**: Contains the logic to manage the refresh tokens and access tokens.
- **Hashing**: Contains the logic to hash the user password.
- **Logger**: Contains the logic to log the application.

### Authentication

The authentication is based on JWT. The application generates an access token and a refresh token when the user logs in. The access token has a short expiration time (1 day) and the refresh token has a long expiration time (7 days). When the access token expires, the user can use the refresh token to generate a new access token.

The access token is stored in the `Authorization` header with the `Bearer` scheme.

```http
Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJlZnJlc2hUb2tlbiI6IjEwMjQzNzY
```

The refresh token is stored in the `Authorization` header with the `Bearer` scheme.

```http
Authorization Bearer eyJpZCI6MSwicmVmcmVzaFRva2VuIjoiMTAyNDM3NjQzNzYifQ==ds51023sdv,LKCSDONoNWON
```

### Authorization

The authorization is based on roles. The application has three roles: `ADMIN`, `USER`.

- The `USER` role is the default role for authenticated users.
- The `ADMIN` role is a special role that manages the users.

## Routes

The application has the following routes:

### Routes

| Method | Path                      | Description          | Authorization       |
| ------ | ------------------------- | -------------------- | ------------------- |
| GET    | /api/users                | Get all users        | ADMIN               |
| GET    | /api/users/:id            | Get a user by ID     | ADMIN / USER (self) |
| GET    | /api/users/profile        | Get self profile     |                     |
| POST   | /api/users                | Create a new user    | ADMIN               |
| PUT    | /api/users/:id            | Update a user by ID  | ADMIN               |
| DELETE | /api/users/:id            | Delete a user by ID  | ADMIN               |
| POST   | /api/auth/login           | User login           |                     |
| PUT    | /api/auth/change-password | Change user password |                     |
| POST   | /api/auth/logout          | User logout          |                     |
| POST   | /api/auth/refresh-token   | Refresh access token |                     |

#### Users

- **GET /api/users**: Get all users

  **Output**:

  ```json
  [
    {
      "id": 1,
      "email": "user@email.com",
      "name": "User",
      "age": 25,
      "role": "USER"
      "createdAt": "2024-04-01T00:00:00.000Z",
      "updatedAt": "2024-04-01T00:00:00.000Z"
    },
    {
      "id": 2,
      "email": "admin@email.com",
      "name": "Admin",
      "age": 30,
      "role": "ADMIN"
      "createdAt": "2024-04-01T00:00:00.000Z",
      "updatedAt": "2024-04-01T00:00:00.000Z"
    }
  ]

  ```

- **GET /api/users/:id**: Get a user by ID

  **Output**:

  ```json
  {
      "id": 1,
      "email": "user@email.com",
      "name": "User",
      "age": 25,
      "role": "USER"
      "createdAt": "2024-04-01T00:00:00.000Z",
      "updatedAt": "2024-04-01T00:00:00.000Z"
    }
  ```

- **GET /api/users/profile**: Get self profile

  **Output**:

  ```json
  {
    "email": "user@email.com",
    "name": "User",
    "age": 25,
    "role": "USER",
    "password": "P@ssw0rd"
  }
  ```

- **POST /api/users**: Create a new user

  **Input**:

  ```json
  {
    "email": "user@email.com",
    "name": "User",
    "age": 25,
    "role": "USER",
    "password": "P@ssw0rd"
  }
  ```

- **PUT /api/users/:id**: Update a user by ID

  **Input**: Changing user's age (The fields are optional)

  ```json
  {
    "email": "user@email.com",
    "name": "User",
    "age": 30,
    "role": "USER",
    "password": "P@ssw0rd"
  }
  ```

- **DELETE /api/users/:id**: Delete a user by ID

  **Output**:

  ```json
  {
      "id": 1,
      "email": "user@email.com",
      "name": "User",
      "age": 25,
      "role": "USER"
      "createdAt": "2024-04-01T00:00:00.000Z",
      "updatedAt": "2024-04-01T00:00:00.000Z"
    }
  ```

#### Auth

On the database seed, the application creates an admin user with the following credentials:

| Email           | Password   |
| --------------- | ---------- |
| admin@email.com | @Bcd123456 |

- **POST /api/auth/login**: User login

  **Input**:

  ```json
  {
    "email": "user@email.com",
    "password": "P@ssw0rd"
  }
  ```

- **PUT /api/auth/change-password**: Change user password

  **Input**:

  ```json
  {
    "password": "P@ssw0rd",
    "newPassword": "P@ssw0rd123",
    "confirmPassword": "P@ssw0rd123"
  }
  ```

- **POST /api/auth/logout**: User logout

  **Output**:

  ```json
  {
    "id": 1,
    "refreshToken": "eyJhbGci5InR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJlZnJlc2hUb2tlbiI6IjEwMjQzNzY"
    "userId": 1,
    "createdAt": "2024-04-01T00:00:00.000Z",
    "updatedAt": "2024-04-01T00:00:00.000Z"
  }
  ```

- **POST /api/auth/refresh-token**: Refresh access token

  **Output**:

  ```json
  {
    "accessToken": "eyJhbGci5InR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJlZnJlc2hUb2tlbiI6IjEwMjQzNzY",
    "refreshToken": "eyJpZCI6MSwicmVmcmVzaFRva2VuIjoiMTAyNDM3NjQzNzYifQ==ds51023sdv,LKCSDONoNWON"
  }
  ```

## Technologies

- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [JWT](https://jwt.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
