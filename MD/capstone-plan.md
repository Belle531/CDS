# Capstone Project Plan: CMoore's Recipe Sharing App

## Project Description and Purpose

A full-stack Recipe Sharing App where users can post, browse, and favorite recipes. The app will allow users to create accounts, share their own recipes, view others' recipes, and save favorites. The goal is to showcase end-to-end skills in backend, frontend, authentication, and deployment.

## Planned Backend

- **Stack:** Express.js + Prisma ORM + PostgreSQL (RDS)
- **Authentication:** JWT (JSON Web Token)
- **Validation:** Zod for request validation
- **Deployment:** Render or AWS Lambda/API Gateway

## API Routes

| Route                | Method | Description                       |
|----------------------|--------|-----------------------------------|
| /api/auth/register   | POST   | Register a new user               |
| /api/auth/login      | POST   | Login and get JWT                 |
| /api/recipes         | GET    | List all recipes                  |
| /api/recipes         | POST   | Create a new recipe (auth)        |
| /api/recipes/:id     | GET    | Get a single recipe               |
| /api/recipes/:id     | PUT    | Update a recipe (auth, owner)     |
| /api/recipes/:id     | DELETE | Delete a recipe (auth, owner)     |
| /api/recipes/:id/favorite | POST | Favorite a recipe (auth)         |
| /api/recipes/favorites | GET  | List user's favorite recipes      |

## Frontend Features and Pages

- Home (recipe feed)
- Recipe detail page
- Create/Edit recipe form
- Favorites page
- Register/Login page
- Profile page
- Responsive design with TailwindCSS

## Authentication Flow

- JWT-based authentication
- Protected routes for creating/editing/deleting recipes and viewing favorites
- Login/register forms

## Deployment Plan

- **Backend:** Render or AWS Lambda/API Gateway
- **Frontend:** Vercel, Netlify, or AWS S3/CloudFront
- **Database:** AWS RDS PostgreSQL

## NPM Libraries

- express
- prisma
- @prisma/client
- pg
- jsonwebtoken
- bcryptjs
- cors
- zod
- react
- react-router-dom
- tailwindcss
- axios

---
This plan will guide the development and deployment of the Recipe Sharing App. All major features, routes, and tech choices are outlined for instructor review before coding begins.
