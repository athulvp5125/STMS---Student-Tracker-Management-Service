
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  allowedRoles: string[];
  redirectPath?: string;
}

export default function ProtectedRoute({
  allowedRoles,
  redirectPath = "/login",
}: ProtectedRouteProps) {
  const { currentUser, userRole, loading } = useAuth();

  // If auth is still loading, show nothing
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-system-blue border-t-transparent rounded-full"></div>
    </div>;
  }
  
  // Check if user is authenticated
  if (!currentUser) {
    return <Navigate to={redirectPath} replace />;
  }
  
  // Check if user has required role
  if (!userRole || !allowedRoles.includes(userRole)) {
    // Redirect admin to admin page if they're trying to access student routes
    if (userRole === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    
    // Redirect others to student page if they're trying to access admin routes
    return <Navigate to="/student" replace />;
  }
  
  // If user is authenticated and has allowed role, render the route
  return <Outlet />;
}
