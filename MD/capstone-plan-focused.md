# Capstone Project Plan - The Spice Rack

## Project Description and Purpose

**Project Name:** The Spice Rack  
**Developer:** Cassandra  
**Repository Links:**
- Backend: [cds-spice-rack-api](https://github.com/Belle531/cds-spice-rack-api)
- Frontend: [cds-spice-rack-frontend](https://github.com/Belle531/cds-spice-rack-frontend)

### What problem does your project solve?
Home cooks struggle to organize their recipes, discover new dishes, and share their culinary creations with others. Most recipe apps are cluttered, lack community features, or don't work well on mobile devices during cooking.

### Who is the target user?
- Home cooks who want to organize and share their recipes
- Food enthusiasts looking to discover new dishes
- Mobile users who need kitchen-friendly recipe interfaces
- Community-minded cooks who want to rate and review recipes

### What makes it interesting or unique?
- **Mobile-first design** optimized for kitchen use
- **Community-driven** recipe sharing and rating system
- **Smart search** by ingredients, cuisine, dietary restrictions
- **Kitchen helper features** like built-in timers and unit conversions
- **Clean, modern UI** built with React and Tailwind CSS

## Planned Backend

**Stack Choice:** Option 2: AWS Lambda + API Gateway + DynamoDB

### DynamoDB Tables Structure

**Users Table:**
```
Primary Key: userId (String)
Attributes:
- email (String, GSI)
- passwordHash (String)
- firstName (String)
- lastName (String)
- createdAt (Number, timestamp)
- isVerified (Boolean)
- preferredLanguage (String)
```

**Recipes Table:**
```
Primary Key: recipeId (String)
Sort Key: userId (String)
Attributes:
- title (String)
- description (String)
- ingredients (List)
- instructions (List)
- prepTime (Number, minutes)
- cookTime (Number, minutes)
- servings (Number)
- difficulty (String: easy|medium|hard)
- cuisine (String)
- dietaryTags (List: vegetarian, vegan, gluten-free, etc.)
- imageUrl (String)
- isPublic (Boolean)
- createdAt (Number, timestamp)
- updatedAt (Number, timestamp)
GSI: PublicRecipes (isPublic-createdAt)
```

**Favorites Table:**
```
Primary Key: userId (String)
Sort Key: recipeId (String)
Attributes:
- createdAt (Number, timestamp)
```

**Ratings Table:**
```
Primary Key: recipeId (String)
Sort Key: userId (String)
Attributes:
- rating (Number, 1-5)
- review (String, optional)
- createdAt (Number, timestamp)
```

## API Routes and Methods

### Authentication Routes
- `POST /auth/register` → Create new user account
- `POST /auth/login` → Authenticate user and return JWT
- `GET /auth/profile` → Get current user profile (protected)
- `PUT /auth/profile` → Update user profile (protected)

### Recipe Management Routes
- `GET /recipes` → Get public recipes with pagination and filters
- `POST /recipes` → Create new recipe (protected)
- `GET /recipes/:id` → Get specific recipe details
- `PUT /recipes/:id` → Update recipe (owner only)
- `DELETE /recipes/:id` → Delete recipe (owner only)
- `GET /recipes/user/:userId` → Get user's public recipes
- `GET /recipes/my` → Get current user's recipes (protected)

### Recipe Interaction Routes
- `POST /recipes/:id/favorite` → Add recipe to favorites (protected)
- `DELETE /recipes/:id/favorite` → Remove from favorites (protected)
- `GET /recipes/favorites` → Get user's favorite recipes (protected)
- `POST /recipes/:id/rating` → Rate and review recipe (protected)
- `GET /recipes/:id/ratings` → Get recipe ratings and reviews

### Search Routes
- `GET /recipes/search` → Search recipes by title, ingredients, cuisine
- `GET /recipes/filter` → Filter recipes by dietary restrictions, difficulty

## Frontend Features and Pages

### Core Pages
1. **Home Page (`/`)**
   - Featured recipes carousel
   - Popular recipes grid
   - Search bar with quick filters
   - User authentication (login/register)

2. **Recipe Discovery (`/discover`)**
   - Advanced search and filtering
   - Category browsing (cuisine, dietary restrictions)
   - Trending recipes

3. **Recipe Details (`/recipe/:id`)**
   - Full recipe display with image
   - Ingredients list with checkboxes
   - Step-by-step instructions
   - Rating and review system
   - Favorite button

4. **My Recipes (`/my-recipes`)** - Protected
   - User's created recipes
   - Add new recipe button
   - Edit/delete existing recipes

5. **Create/Edit Recipe (`/recipe/new`, `/recipe/:id/edit`)** - Protected
   - Recipe form with image upload
   - Ingredient and instruction management
   - Privacy settings (public/private)

6. **Favorites (`/favorites`)** - Protected
   - User's saved recipes
   - Quick access to favorite dishes

7. **User Profile (`/profile`)** - Protected
   - Profile information
   - User's public recipes
   - Account settings

## Authentication Flow

**Method:** JWT (JSON Web Tokens) with email/password authentication

### Authentication Process:
1. User registers with email, password, first/last name
2. Password is hashed with bcrypt before storing
3. Login returns JWT token with user information
4. Token is stored in localStorage on frontend
5. Protected routes require valid JWT token
6. Token expires after 24 hours, requires re-login

### Protected Routes:
- All recipe creation/editing endpoints
- User profile management
- Favorites management
- Rating/review submission

## Deployment Plan

### Frontend Deployment: **AWS S3 + CloudFront**
- **Hosting:** S3 static website hosting
- **CDN:** CloudFront for global distribution
- **Domain:** Custom domain through Route 53
- **SSL:** AWS Certificate Manager
- **Build:** Vite production build with optimized assets

### Backend Deployment: **AWS Lambda + API Gateway**
- **API Gateway:** REST API with CORS configuration
- **Lambda Functions:** Serverless functions for each route group
- **Database:** DynamoDB tables in same AWS region
- **Authentication:** JWT secret stored in AWS Systems Manager
- **File Storage:** S3 bucket for recipe images

### Environment Setup:
```bash
# Frontend Environment Variables
VITE_API_BASE_URL=https://api.spice-rack.com
VITE_AWS_REGION=us-east-1

# Backend Environment Variables (Lambda)
JWT_SECRET=<stored-in-systems-manager>
DYNAMODB_REGION=us-east-1
S3_BUCKET_NAME=spice-rack-images
```

## NPM Libraries / Tools

### Frontend Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "axios": "^1.3.0",
    "tailwindcss": "^3.2.0",
    "lucide-react": "^0.312.0",
    "react-hook-form": "^7.43.0",
    "react-hot-toast": "^2.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^3.1.0",
    "vite": "^4.1.0",
    "eslint": "^8.34.0",
    "prettier": "^2.8.0"
  }
}
```

### Backend Dependencies
```json
{
  "dependencies": {
    "aws-sdk": "^2.1329.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "joi": "^17.7.0",
    "uuid": "^9.0.0",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "serverless": "^3.28.0",
    "serverless-offline": "^12.0.0",
    "jest": "^29.4.0"
  }
}
```

### Development Tools
- **Framework:** Serverless Framework for Lambda deployment
- **Testing:** Jest for unit testing
- **Validation:** Joi for request validation
- **Image Processing:** AWS Lambda with Sharp layer
- **Local Development:** Serverless Offline plugin

## Development Timeline

### Week 1-2: Backend Foundation
- Set up DynamoDB tables
- Implement authentication Lambda functions
- Create basic recipe CRUD operations
- Deploy to AWS Lambda + API Gateway

### Week 3-4: Frontend Development
- Build React components and pages
- Implement routing and authentication
- Connect to backend APIs
- Add recipe creation and search features

### Week 5-6: Polish and Testing
- Add rating/review system
- Implement image upload functionality
- Write automated tests
- Performance optimization and bug fixes

### Week 7: Deployment and Demo
- Production deployment
- Demo preparation
- Documentation completion
- Final testing and quality assurance

---

**Total Estimated Development Time:** 6-7 weeks  
**Primary Focus:** Mobile-first recipe community platform  
**Target Launch:** December 2025