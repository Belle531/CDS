# Capstone Project Plan: CMoore's Backend Recipe App

## Project Description and Purpose

A backend API for CMoore’s Recipe Sharing App. This project solves the problem of organizing, sharing, and discovering recipes online. Target users are home cooks, food enthusiasts, and anyone looking to save or share recipes. Unique features include user favorites, recipe editing, and secure authentication.

## Planned Backend

- **Stack:** Express.js + Prisma ORM + PostgreSQL (AWS RDS)
- **Authentication:** JWT (email/password)
- **Validation:** Zod or Joi
- **Deployment:** Render or AWS Lambda + API Gateway

### Main Models/Tables

- User
- Recipe
- Favorite

## API Routes and Methods

| Route                      | Method | Description                       |
|----------------------------|--------|-----------------------------------|
| /api/auth/register         | POST   | Register a new user               |
| /api/auth/login            | POST   | Login and get JWT                 |
| /api/recipes               | GET    | List all recipes                  |
| /api/recipes               | POST   | Create a new recipe (auth)        |
| /api/recipes/:id           | GET    | Get a single recipe               |
| /api/recipes/:id           | PUT    | Update a recipe (auth, owner)     |
| /api/recipes/:id           | DELETE | Delete a recipe (auth, owner)     |
| /api/recipes/:id/favorite  | POST   | Favorite a recipe (auth)          |
| /api/recipes/favorites     | GET    | List user's favorite recipes      |

## Authentication Flow

- Email/password registration and login
- JWT for protected routes (create/edit/delete/favorite recipes)

## Deployment Plan

- **Backend:** Render or AWS Lambda + API Gateway
- **Database:** AWS RDS PostgreSQL
- **Setup:** .env for secrets, JWT secret, DB connection string

## NPM Libraries / Tools

- express
- prisma
- @prisma/client
- pg
- jsonwebtoken
- bcryptjs
- cors
- zod
