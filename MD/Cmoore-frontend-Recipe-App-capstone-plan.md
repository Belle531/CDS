# Capstone Project Plan: CMoore's Frontend Recipe App

## Project Description and Purpose

Frontend for CMoore’s Recipe Sharing App. Users can browse, post, and favorite recipes. The app is designed for food lovers and home cooks, with a clean, responsive UI and easy navigation.

## Frontend Features and Pages

- Home page (recipe feed)
- Recipe detail page
- Create/Edit recipe form
- Favorites page
- Register/Login page
- Profile page

## Authentication Flow

- Email/password login (JWT)
- Protected routes for creating/editing/deleting recipes and viewing favorites

## Deployment Plan

- **Frontend:** Vercel, Netlify, or AWS S3/CloudFront
- **Setup:** .env for API URL, build commands

## NPM Libraries / Tools

- react
- react-router-dom
- tailwindcss
- axios
- swr or react-query (for data fetching)
- zod (for validation)
