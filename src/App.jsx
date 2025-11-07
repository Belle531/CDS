import React, { useState } from 'react';
import LoginView from './LoginView.jsx';
import RegisterView from './RegisterView.jsx';
import Welcome from './Welcome.jsx';
import Dashboard from './Dashboard.jsx';
import ToDoApp from './ToDoApp.jsx';

export default function App() {
    const [currentView, setCurrentView] = useState('register'); // 'register', 'login', 'welcome', 'dashboard', 'todo'
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        setUser({ email: 'user@example.com', uid: 'mock-user-id' });
        setCurrentView('welcome');
    };

    const handleRegisterSuccess = () => {
        setCurrentView('login');
        alert("Registration successful! Please log in with your new account.");
    };

    const handleSwitchToRegister = () => {
        setCurrentView('register');
    };

    const handleSwitchToLogin = () => {
        setCurrentView('login');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setCurrentView('login');
    };

    const handleGoToToDo = () => {
        setCurrentView('todo');
    };

    const handleGoToDashboard = () => {
        setCurrentView('dashboard');
    };

    const handleBackToWelcome = () => {
        setCurrentView('welcome');
    };

    const handleBackToDashboard = () => {
        setCurrentView('welcome'); // ToDo goes back to Welcome, not Dashboard
    };

    // Show ToDo App
    if (currentView === 'todo') {
        return <ToDoApp onBackToDashboard={handleBackToDashboard} />;
    }

    // Show Dashboard
    if (isAuthenticated && currentView === 'dashboard') {
        return <Dashboard onBackToWelcome={handleBackToWelcome} />;
    }

    // Show Welcome (main dashboard after login)
    if (isAuthenticated && currentView === 'welcome') {
        return <Welcome user={user} handleLogout={handleLogout} onGoToToDo={handleGoToToDo} onGoToDashboard={handleGoToDashboard} />;
    }

    // Show Login View
    if (currentView === 'login') {
        return (
            <LoginView 
                onLoginSuccess={handleLoginSuccess}
                onSwitchToRegister={handleSwitchToRegister}
            />
        );
    }

    // Show Register View (default)
    return (
        <RegisterView 
            onRegisterSuccess={handleRegisterSuccess}
            onSwitchToLogin={handleSwitchToLogin}
        />
    );
}
