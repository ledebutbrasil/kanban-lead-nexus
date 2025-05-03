
import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { useAppContext } from "../context/AppContext";

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAppContext();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary">LeadKanban</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to manage your leads
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
