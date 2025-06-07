
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import Login from '../components/Login';
import Register from '../components/Register';
import Welcome from '../components/Welcome';
import Dashboard from '../components/Dashboard';
import Onboarding from '../components/Onboarding';

const AppContent = () => {
  const { user, isOnboardingComplete, isWelcomeComplete } = useAuth();

  if (!user) {
    return <AuthFlow />;
  }

  if (!isWelcomeComplete) {
    return <Welcome />;
  }

  if (!isOnboardingComplete) {
    return <Onboarding />;
  }

  return <Dashboard />;
};

const AuthFlow = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-orange-400">
      {isLogin ? (
        <Login onSwitchToRegister={() => setIsLogin(false)} />
      ) : (
        <Register onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <AppContent />
      </div>
    </AuthProvider>
  );
};

export default Index;
