# Capstone Project Plan - CDS (Cassandra's Digital Solutions)

## 📋 Project Overview

**Project Name:** CDS - Cassandra's Digital Solutions Platform  
**Project Type:** Multi-Application Authentication Platform with Integrated Apps  
**Chosen Focus:** Recipe Sharing App (The Spice Rack) + Weather App + ToDo Management  

### Project Description and Purpose

CDS is a comprehensive digital solutions platform that serves as a secure authentication hub for multiple integrated applications. The platform demonstrates advanced full-stack development skills through:

- **Core Platform**: Secure authentication system with MFA, multi-language support, and modular architecture
- **Primary Application**: The Spice Rack - A mobile-first recipe community where users can search, save, and share high-quality recipes
- **Secondary Applications**: Weather forecasting (TypeScript), ToDo management, and extensible app ecosystem

**Business Purpose**: A production-ready platform that showcases enterprise-level authentication patterns while providing practical utility applications for end users.

---

## 🏗️ Backend Architecture Plan

### Database Strategy: **AWS RDS (PostgreSQL) + DynamoDB Hybrid**

**Primary Database (PostgreSQL on RDS):**
sql
-- User Management
Users Table:

- user_id (UUID, Primary Key)
- email (VARCHAR, UNIQUE)
- password_hash (VARCHAR)
- first_name (VARCHAR)
- last_name (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- is_verified (BOOLEAN)
- preferred_language (VARCHAR)

-- User Sessions
UserSessions Table:

- session_id (UUID, Primary Key)
- user_id (UUID, Foreign Key)
- jwt_token (TEXT)
- expires_at (TIMESTAMP)
- device_info (JSON)
- ip_address (INET)

-- Recipe Management
Recipes Table:

- recipe_id (UUID, Primary Key)
- user_id (UUID, Foreign Key)
- title (VARCHAR)
- description (TEXT)
- ingredients (JSON)
- instructions (JSON)
- prep_time (INTEGER)
- cook_time (INTEGER)
- servings (INTEGER)
- difficulty_level (INTEGER)
- cuisine_type (VARCHAR)
- dietary_restrictions (JSON)
- nutrition_info (JSON)
- image_url (VARCHAR)
- is_public (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

-- Recipe Interactions
RecipeFavorites Table:

- favorite_id (UUID, Primary Key)
- user_id (UUID, Foreign Key)
- recipe_id (UUID, Foreign Key)
- created_at (TIMESTAMP)

RecipeRatings Table:

- rating_id (UUID, Primary Key)
- user_id (UUID, Foreign Key)
- recipe_id (UUID, Foreign Key)
- rating (INTEGER, 1-5)
- review (TEXT)
- created_at (TIMESTAMP)

-- User Preferences
UserPreferences Table:

- preference_id (UUID, Primary Key)
- user_id (UUID, Foreign Key)
- dietary_restrictions (JSON)
- favorite_cuisines (JSON)
- cooking_skill_level (INTEGER)
- measurement_units (VARCHAR)
- notification_settings (JSON)

**Secondary Database (DynamoDB for Caching/Performance):**
json
// Weather Cache
WeatherData:

- location (Partition Key)
- timestamp (Sort Key)
- weather_data (JSON)
- ttl (Number)

// Recipe Search Cache
RecipeSearchCache:

- search_query (Partition Key)
- timestamp (Sort Key)
- results (JSON)
- ttl (Number)

### Backend Technology Stack

- **Runtime**: Node.js with Express.js
- **Database ORM**: Prisma (for PostgreSQL)
- **Authentication**: AWS Cognito + Custom JWT
- **API Documentation**: OpenAPI/Swagger
- **Validation**: Joi/Yup schema validation
- **File Storage**: AWS S3 (recipe images)
- **Caching**: Redis for session management
- **Deployment**: AWS Lambda + API Gateway (serverless)

---

## 🌐 API Routes and Endpoints

### Authentication Routes (`/api/auth`)

```javascript
POST   /api/auth/register          // User registration with email verification
POST   /api/auth/login             // Email/password authentication
POST   /api/auth/verify-mfa        // Multi-factor authentication verification
POST   /api/auth/refresh-token     // JWT token refresh
POST   /api/auth/logout            // Session termination
GET    /api/auth/profile           // Get current user profile
PUT    /api/auth/profile           // Update user profile
POST   /api/auth/forgot-password   // Password reset request
POST   /api/auth/reset-password    // Password reset confirmation
```

### Recipe Management Routes (`/api/recipes`)

```javascript
GET    /api/recipes                // Get paginated recipes (public + user's private)
POST   /api/recipes                // Create new recipe (authenticated)
GET    /api/recipes/search         // Search recipes by ingredients/cuisine/name
GET    /api/recipes/:id            // Get specific recipe details
PUT    /api/recipes/:id            // Update recipe (owner only)
DELETE /api/recipes/:id            // Delete recipe (owner only)
POST   /api/recipes/:id/favorite   // Add recipe to favorites
DELETE /api/recipes/:id/favorite   // Remove from favorites
GET    /api/recipes/favorites      // Get user's favorite recipes
POST   /api/recipes/:id/rating     // Rate and review recipe
GET    /api/recipes/:id/ratings    // Get recipe ratings and reviews
POST   /api/recipes/upload-image   // Upload recipe image to S3
```

### Weather Integration Routes (`/api/weather`)

```javascript
GET    /api/weather/current/:location    // Get current weather data
GET    /api/weather/forecast/:location   // Get 5-day forecast
GET    /api/weather/locations/search     // Search for locations
POST   /api/weather/preferences          // Save user weather preferences
GET    /api/weather/preferences          // Get user weather preferences
```

### User Management Routes (`/api/users`)

```javascript
GET    /api/users/preferences      // Get user preferences
PUT    /api/users/preferences      // Update user preferences
GET    /api/users/activity         // Get user activity log
POST   /api/users/feedback         // Submit user feedback
GET    /api/users/dashboard-stats  // Get dashboard statistics
```

### External API Integration

```javascript
// Spoonacular Recipe API Integration
GET    /api/external/recipes/search      // Proxy to Spoonacular API
GET    /api/external/recipes/:id         // Get external recipe details
POST   /api/external/recipes/import     // Import external recipe to user collection

// OpenWeatherMap Integration  
GET    /api/external/weather/current    // Proxy to weather API
GET    /api/external/weather/forecast   // Proxy to forecast API
```

---

## 🎨 Frontend Features and Pages

### Core Platform Pages

1. **Landing/Register Page** (`/`)
   - Multi-language registration form (EN/ES/FR)
   - Client-side validation
   - Responsive design

2. **Login Page** (`/login`)
   - Multi-factor authentication flow
   - Password visibility controls
   - "Remember Me" functionality
   - Social login preparation (Google, Microsoft, GitHub)

3. **Welcome Dashboard** (`/welcome`)
   - Personalized greeting with user's name
   - Quick access to all applications
   - User activity overview

4. **Application Hub** (`/dashboard`)
   - Grid layout of available applications
   - Quick stats and notifications
   - Application management

### The Spice Rack Application (`/spice-rack`)

5.**Recipe Discovery** (`/spice-rack/discover`)

- Featured recipes carousel
- Category-based browsing
- Search functionality with filters
- Trending recipes

6.**Recipe Details** (`/spice-rack/recipe/:id`)

- Full recipe display with images
- Ingredient checklist
- Step-by-step instructions
- Cooking timers integration
- Rating and review system
- Nutritional information

7.**My Recipes** (`/spice-rack/my-recipes`)

- User's created recipes
- Recipe editing interface
- Privacy settings (public/private)
- Recipe analytics

8.**Favorites** (`/spice-rack/favorites`)

- Saved recipes collection
- Organization by categories
- Quick access cooking mode
9.**Recipe Creation** (`/spice-rack/create`)
- Rich recipe editor
- Image upload functionality
- Ingredient quantity calculator
- Nutrition estimation
- Recipe testing mode

10.**Community** (`/spice-rack/community`)
    - Recipe sharing feed
    - User profiles
    - Recipe challenges
    - Social interactions

### Weather Application (`/weather`)

11.**Weather Dashboard** (`/weather`)
    - Current conditions display
    - 5-day forecast
    - Multiple location support
    - Weather alerts

12.**Weather Settings** (`/weather/settings`)
    - Location management
    - Unit preferences (°F/°C)
    - Notification settings

### ToDo Application (`/todo`)

13.**Task Management** (`/todo`) - Currently Implemented ✅
    - Task creation and completion
    - Task categorization
    - Due date management

### Shared Components

- **Navigation Header**: Consistent across all applications
- **Authentication Guards**: Route protection
- **Loading States**: Professional loading indicators
- **Error Boundaries**: Graceful error handling
- **Toast Notifications**: User feedback system

---

## 🔐 Authentication Flow

### Multi-Factor Authentication Process

```mermaid
graph TD
    A[User Registration] --> B[Email Verification]
    B --> C[Profile Setup]
    C --> D[Login Attempt]
    D --> E[Email/Password Check]
    E --> F[MFA Code Generation]
    F --> G[SMS/Email MFA Code]
    G --> H[Code Verification]
    H --> I[JWT Token Issued]
    I --> J[Dashboard Access]
    J --> K[Application Access]
    
    K --> L[Token Refresh Logic]
    L --> M[Session Management]
    M --> N[Logout Process]


### Authentication Technology Stack

- **Primary**: AWS Cognito User Pools
- **Backup**: Custom JWT implementation
- **MFA Methods**: 
  - SMS verification (Twilio integration)
  - Email verification (AWS SES)
  - Authenticator apps (Google Authenticator, Authy)
- **Session Management**: Redis-based session store
- **Token Security**: HttpOnly cookies + localStorage hybrid approach

### Protected Route Implementation

```javascript
// Route Protection Middleware
const requireAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Application-Specific Protection
const requireRecipeAccess = (req, res, next) => {
    // Additional checks for recipe-specific permissions
    next();
};
```

---

## 🚀 Deployment Plan

### Frontend Deployment: **AWS S3 + CloudFront**

```yaml
# Deployment Architecture
Frontend:
  - Primary: AWS S3 Static Website Hosting
  - CDN: CloudFront for global distribution
  - Domain: Custom domain with Route 53
  - SSL: AWS Certificate Manager
  - CI/CD: GitHub Actions for automated deployment

Build Process:
  - Vite production build optimization
  - Asset compression and minification
  - Environment variable injection
  - Cache invalidation strategy
```

### Backend Deployment: **AWS Lambda + API Gateway**

```yaml
# Serverless Architecture
API Gateway:
  - REST API endpoints
  - CORS configuration
  - Request/response transformations
  - API throttling and usage plans

Lambda Functions:
  - Individual functions per route group
  - Environment variable management
  - VPC configuration for RDS access
  - Layer management for shared dependencies

Database:
  - RDS PostgreSQL in Multi-AZ setup
  - DynamoDB tables for caching
  - Redis ElastiCache for sessions
  - S3 for file storage (recipe images)

Monitoring:
  - CloudWatch for logging and metrics
  - AWS X-Ray for distributed tracing
  - SNS for error notifications
  - Lambda function monitoring
```

### Alternative Deployment (Backup Plan)

- **Frontend**: Vercel (for easy rollback)
- **Backend**: Render.com (for simplified deployment)
- **Database**: Railway or PlanetScale (managed PostgreSQL)

---

## 📦 NPM Libraries and Dependencies

### Frontend Dependencies

```json
{
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.0",
    "react-query": "^4.35.0",
    "react-hook-form": "^7.47.0",
    "tailwindcss": "^3.4.18",
    "lucide-react": "^0.552.0",
    "framer-motion": "^10.16.0",
    "react-hot-toast": "^2.4.1",
    "date-fns": "^2.30.0",
    "recharts": "^2.8.0",
    "react-image-gallery": "^1.3.0",
    "react-select": "^5.8.0",
    "aws-amplify": "^6.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.0.4",
    "@types/react": "^19.1.16",
    "@types/react-dom": "^19.1.9",
    "typescript": "^5.3.0",
    "eslint": "^9.36.0",
    "prettier": "^3.1.0",
    "vite": "npm:rolldown-vite@7.1.14",
    "tailwindcss": "^3.4.18",
    "autoprefixer": "^10.4.21"
  }
}
```

### Backend Dependencies

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "prisma": "^5.6.0",
    "@prisma/client": "^5.6.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "joi": "^17.11.0",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.0",
    "aws-sdk": "^2.1500.0",
    "multer": "^1.4.5",
    "sharp": "^0.32.6",
    "redis": "^4.6.0",
    "nodemailer": "^6.9.7",
    "twilio": "^4.20.0",
    "axios": "^1.6.0",
    "node-cron": "^3.0.3"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.7.0",
    "supertest": "^6.3.3",
    "@types/node": "^20.8.0",
    "typescript": "^5.3.0",
    "eslint": "^8.52.0",
    "prettier": "^3.1.0"
  }
}
```

### API Integration Libraries

```json
{
  "external-apis": {
    "spoonacular-api": "For recipe database integration",
    "openweathermap": "For weather data",
    "unsplash-api": "For high-quality food photography",
    "nutritionix": "For nutritional information",
    "twilio": "For SMS MFA verification",
    "aws-ses": "For email notifications"
  }
}
```

---

## 🧪 Testing Strategy

### Automated Testing (Minimum 2 Required)

```javascript
// Backend Unit Tests (Jest)
describe('Authentication Routes', () => {
  test('POST /api/auth/register - should create new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'SecurePass123!',
        firstName: 'Test',
        lastName: 'User'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.user.email).toBe('test@example.com');
  });

  test('POST /api/auth/login - should authenticate user', async () => {
    // Test implementation
  });
});

// Frontend Integration Tests (React Testing Library)
describe('Recipe Creation Flow', () => {
  test('should allow user to create and save recipe', async () => {
    render(<RecipeCreationForm />);
    
    fireEvent.change(screen.getByLabelText(/recipe title/i), {
      target: { value: 'Test Recipe' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /save recipe/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/recipe saved successfully/i)).toBeInTheDocument();
    });
  });
});

// API Integration Tests
describe('External API Integration', () => {
  test('should fetch recipes from Spoonacular API', async () => {
    // Mock external API call
    // Test response handling
    // Verify data transformation
  });
});
```

### Manual Testing Checklist

- [ ] Complete user registration and MFA flow
- [ ] Recipe creation, editing, and deletion
- [ ] Search functionality with various filters
- [ ] Mobile responsiveness across devices
- [ ] Cross-browser compatibility testing
- [ ] Performance testing with large datasets
- [ ] Security testing (SQL injection, XSS prevention)
- [ ] Accessibility testing (screen readers, keyboard navigation)

---

## 🎯 Presentation Preparation

### Live Demo Flow (10-15 minutes)

1. **Authentication Demo** (3 minutes)
   - Show registration with multi-language support
   - Demonstrate MFA login process
   - Explain security considerations

2. **The Spice Rack Demo** (5 minutes)
   - Recipe search and discovery
   - Create a new recipe with image upload
   - Show community features and ratings
   - Demonstrate mobile-responsive design

3. **Technical Architecture** (4 minutes)
   - Show database schema and relationships
   - Explain API integration with external services
   - Demonstrate AWS deployment architecture
   - Show monitoring and logging setup

4. **Code Walkthrough** (3 minutes)
   - Explain key backend API routes
   - Show frontend state management
   - Demonstrate testing implementation

### Q&A Preparation Topics

- **Scalability**: How to handle 10,000+ concurrent users
- **Security**: JWT vs OAuth2, SQL injection prevention
- **Performance**: Database optimization, caching strategies
- **DevOps**: CI/CD pipeline, monitoring, error handling
- **Future Features**: AI recipe recommendations, voice commands

### Live Feature Implementation Challenge

**Prepared to Implement**: Recipe Rating System

- Backend: New API endpoint for ratings
- Frontend: Star rating component
- Database: Rating storage and aggregation
- Real-time: WebSocket for live rating updates

---

## 📈 Project Scope and Timeline

### Phase 1: Core Platform (Week 1-2)

- [ ] Complete backend API development
- [ ] AWS Cognito integration
- [ ] Database schema implementation
- [ ] Frontend authentication flow completion

### Phase 2: The Spice Rack Application (Week 3-4)

- [ ] Recipe management system
- [ ] External API integration (Spoonacular)
- [ ] Image upload and processing
- [ ] Search and filtering functionality

### Phase 3: Weather Integration (Week 5)

- [ ] TypeScript weather component development
- [ ] OpenWeatherMap API integration
- [ ] Location-based weather services
- [ ] Mobile weather interface

### Phase 4: Testing and Deployment (Week 6)

- [ ] Comprehensive testing suite
- [ ] AWS deployment configuration
- [ ] Performance optimization
- [ ] Documentation completion

### Phase 5: Polish and Presentation (Week 7)

- [ ] UI/UX refinements
- [ ] Demo preparation
- [ ] Feature showcase development
- [ ] Presentation materials

---

## 🏆 Exceeding Requirements

### Beyond Minimum Requirements

1. **Multi-Application Platform**: Not just one app, but an extensible platform
2. **Advanced Authentication**: MFA, multi-language, social login ready
3. **TypeScript Integration**: Weather app demonstrates mixed-language development
4. **Production Architecture**: AWS best practices, monitoring, scaling
5. **Mobile-First Design**: PWA capabilities, responsive across all devices
6. **Real-time Features**: WebSocket integration for live updates
7. **AI-Ready Architecture**: Structured for future ML/AI integrations
8. **Enterprise Security**: Rate limiting, OWASP compliance, audit logging

### Innovation Points

- **Hybrid Database Strategy**: SQL + NoSQL for optimal performance
- **Serverless Architecture**: Cost-effective, scalable backend
- **Community Features**: Social aspects beyond basic CRUD
- **External API Integration**: Multiple service integrations
- **Progressive Web App**: Installable, offline-capable
- **Accessibility Focus**: WCAG 2.1 AA compliance
- **Performance Optimization**: < 2s load times, 95+ Lighthouse scores

---

## 📋 Deliverables Checklist

### Required Deliverables

- [x] GitHub repository with structured code ✅
- [x] This capstone-plan.md file ✅
- [ ] Deployed backend URL (pending AWS setup)
- [ ] Deployed frontend URL (pending deployment)
- [ ] Complete README with screenshots
- [ ] Automated test suite (minimum 2 tests)
- [ ] Live demo preparation

### Bonus Deliverables

- [ ] API documentation (Swagger/OpenAPI)
- [ ] Performance benchmarking results
- [ ] Security audit report
- [ ] User testing feedback compilation
- [ ] Future roadmap documentation
- [ ] Mobile app prototype (React Native)

---

**Project Status**: ✅ Planning Complete - Ready for Backend Development  
**Expected Completion**: December 15, 2025  
**Deployment Target**: AWS (Primary), Vercel (Secondary)  
**Total Development Time**: 6-7 weeks
*Last Updated: November 8, 2025*
