import React from 'react';

/**
 * Welcome Component
 * Shows the welcome screen after successful login
 */
const Welcome = ({ user, handleLogout, onGoToToDo, onGoToDashboard }) => {

    return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
                <header className="w-full bg-slate-800 p-4 shadow-xl fixed top-0 left-0">
                    <h1 className="text-3xl font-extrabold text-white text-center tracking-wider">
                        Welcome to Cassandra's Digital Solutions
                    </h1>
                </header>

                {/* Logo Section - Enhanced */}
                <div className="mt-20 mb-8 text-center">
                    {/* Logo Container with Animation */}
                    <div className="relative inline-block">
                        <div className="w-28 h-28 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300 border-4 border-white">
                            <span className="text-white font-bold text-3xl tracking-wider">CDS</span>
                        </div>
                        {/* Animated Ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-amber-400 opacity-20 animate-ping"></div>
                    </div>
                    
                    {/* Company Tagline */}
                    <div className="mt-4">
                        <p className="text-sm text-slate-500 font-medium">Your Digital Partner for Success</p>
                    </div>
                    
                    {/* User Welcome Badge */}
                    <div className="mt-3 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                        Welcome back, {user?.email?.split('@')[0] || 'User'}!
                    </div>
                </div>

                {/* Main Dashboard Card - Made Bigger */}
                <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-2xl border border-gray-100">
                    
                    <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="font-semibold text-green-800 mb-4 text-lg">Status</h3>
                        <p className="text-green-700 text-base mb-2">✓ Registration Complete!</p>
                        <p className="text-green-700 text-base mb-2">✓ Session Active: Logged in as {user?.email || 'user'}!</p>
                        <p className="text-green-700 text-base mb-2">✓ Full Feature Access Enabled</p>
                        <p className="text-green-700 text-base">✓ Ready to proceed to ToDo App</p>
                    </div>
                    
                    {/* Four Buttons Side by Side */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Login Button */}
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-md transition-colors duration-200"
                        >
                            Login
                        </button>
                        
                        {/* Checkout ToDo App Button */}
                        <button
                            onClick={onGoToToDo}
                            className="bg-blue-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-md transition-colors duration-200"
                        >
                            Checkout My ToDo App
                        </button>
                        
                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 shadow-md transition-colors duration-200"
                        >
                            Logout
                        </button>
                        
                        {/* Dashboard Button */}
                        <button
                            onClick={onGoToDashboard}
                            className="bg-amber-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-colors duration-200"
                        >
                            Dashboard
                        </button>
                    </div>
                </div>

              
                <footer className="w-full bg-slate-800 p-4 shadow-xl fixed bottom-0 left-0">
                    <p className="text-gray-300 text-center text-sm font-medium font-sans">
                        &copy; 2025 Cassandra's Digital Solutions. All rights reserved.
                    </p>
                </footer>
            </div>
    );
};

export default Welcome;
