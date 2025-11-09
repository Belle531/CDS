# CDS Spice Rack Frontend

## 🍳 The Spice Rack - Recipe Community Platform

Frontend web application for The Spice Rack - a mobile-first recipe community platform where users can search, save, and share high-quality recipes. Built with React and Tailwind CSS. Your kitchen companion.

## 🔗 Capstone Project Links

- **Backend Repository:** [cds-spice-rack-api](https://github.com/Belle531/cds-spice-rack-api) *(To be created)*
- **Project Plan:** [capstone-plan.md](./capstone-plan-focused.md)

### ✨ Key Features

- **Mobile-First Design** - Optimized for kitchen use while cooking
- **Recipe Discovery** - Search and filter by ingredients, cuisine, dietary needs
- **Community Features** - Rate, review, and share recipes with others
- **User Dashboard** - Manage personal recipes and favorites
- **Advanced Authentication** - Secure login with modern UX patterns
- **Responsive Design** - Works seamlessly on phones, tablets, and desktop

### 🛠️ Technology Stack

- **Frontend**: React 19.1.1, Vite 7.1.14
- **Styling**: Tailwind CSS 3.4.18
- **Icons**: Lucide React
- **Authentication**: Ready for AWS Cognito integration
- **Build Tool**: Rolldown-Vite for optimized performance

### 📦 Installation

```bash
npm install
npm run dev
```

### 🏗️ Current Project Structure

```
src/
├── App.jsx              # Main application and routing
├── LoginView.jsx        # Authentication system
├── RegisterView.jsx     # User registration
├── Welcome.jsx          # User dashboard
├── Dashboard.jsx        # Application launcher
├── ToDoApp.jsx          # Sample integrated app
├── SpiceRack/           # Future recipe app structure
├── WeatherApp/          # Future weather app structure
└── assets/
    └── AuthLayout.jsx   # Shared UI layout
```

### 🌟 Planned Recipe Features

1. **Recipe Discovery** - Search by ingredients, cuisine, dietary restrictions
2. **Recipe Management** - Create, edit, and organize personal recipes
3. **Community Features** - Rate, review, and share recipes
4. **Kitchen Helper** - Built-in timers, unit conversions, shopping lists
5. **Mobile Optimization** - Touch-friendly cooking interface

### 🌟 Features Showcase

1. **Registration** - Multi-language form with validation
2. **Authentication** - MFA with custom toast notifications
3. **Dashboard** - Modular application launcher
4. **ToDo App** - Full-featured task management
5. **Personalization** - Dynamic user name display

### 🔒 Authentication & Security

- JWT-based authentication system
- Multi-factor authentication ready
- Client-side form validation
- Protected routes for user content
- Secure session management

### 📱 Mobile-First Design

Kitchen-optimized interface featuring:

- Large touch targets for cooking with messy hands
- High contrast text for various lighting conditions
- Swipe gestures for recipe navigation
- Screen wake lock during cooking
- Offline recipe access capabilities

### 📦 Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

**Project Type**: Capstone Frontend  
**Backend**: AWS Lambda + DynamoDB  
**Status**: Ready for Backend Integration  
**Last Updated**: November 2025
