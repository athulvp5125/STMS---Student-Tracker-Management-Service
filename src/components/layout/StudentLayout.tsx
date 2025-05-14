
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User, GraduationCap, Briefcase, FileText, Book } from "lucide-react";

interface StudentLayoutProps {
  children: React.ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-system-blue text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">STMS: Student Portal</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline">
              Welcome, {currentUser?.displayName || currentUser?.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-system-blue border-white hover:bg-blue-50"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center overflow-x-auto whitespace-nowrap">
            <NavLink icon={User} label="My Profile" path="/student" />
            <NavLink icon={GraduationCap} label="Academic Records" path="/student/academics" />
            <NavLink icon={Briefcase} label="Placements" path="/student/placements" />
            <NavLink icon={FileText} label="Training" path="/student/training" />
            <NavLink icon={Book} label="Exams" path="/student/exams" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="container mx-auto max-w-6xl">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white py-4 shadow-inner">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} STMS - Student Tracker Management System
        </div>
      </footer>
    </div>
  );
};

function NavLink({ icon: Icon, label, path }: { icon: React.ElementType; label: string; path: string }) {
  const navigate = useNavigate();
  const isActive = location.pathname === path;

  return (
    <button
      onClick={() => navigate(path)}
      className={`flex items-center py-4 px-3 text-gray-700 border-b-2 transition-colors ${
        isActive 
          ? "border-system-blue text-system-blue font-medium" 
          : "border-transparent hover:border-gray-300"
      }`}
    >
      <Icon size={18} className="mr-2" />
      {label}
    </button>
  );
}
