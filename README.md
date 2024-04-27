# Harbour Optimization | GDSC ESTIN - Bejaia HACKATHON

## Description

This project is a backend API of a system that optimizes the process of managing ships and decks in the harbour

## Setup

To run this project, you need to have Node.js installed on your machine. Clone the repository and run the following commands:

1. Install the dependencies:

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
- **AuthTokens**: Contains the logic to manage the refresh tokens and access tokens.
- **Hashing**: Contains the logic to hash the user password.
- **Logger**: Contains the logic to log the application.
- **Decks**: Contains the logic to manage the decks.
- **Ships**: Contains the logic to manage the ships.
- **Trips**: Contains the logic to manage the trips.
