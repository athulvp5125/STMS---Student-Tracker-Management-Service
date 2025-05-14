
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, Home, Users, BookOpen, Award, GraduationCap, FileText, Settings, Archive, Calculator } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

const NavLink = ({ href, icon, children, active }: NavLinkProps) => (
  <Link
    to={href}
    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
      active
        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground"
    }`}
  >
    {icon}
    <span>{children}</span>
  </Link>
);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const navLinks = [
    { href: "/admin", label: "Dashboard", icon: <Home className="h-4 w-4" /> },
    { href: "/admin/students", label: "Students", icon: <Users className="h-4 w-4" /> },
    { href: "/admin/academics", label: "Academics", icon: <BookOpen className="h-4 w-4" /> },
    { href: "/admin/placements", label: "Placements", icon: <Award className="h-4 w-4" /> },
    { href: "/admin/training", label: "Training", icon: <GraduationCap className="h-4 w-4" /> },
    { href: "/admin/exams", label: "Exams", icon: <FileText className="h-4 w-4" /> },
    { href: "/admin/question-paper", label: "Question Papers", icon: <Calculator className="h-4 w-4" /> },
    { href: "/admin/settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-sidebar fixed top-0 bottom-0 lg:left-0 w-64 lg:w-72 pt-16 transition-all duration-300 ease-in-out z-40 ${
          sidebarOpen ? "left-0" : "-left-72"
        }`}
      >
        <div className="flex flex-col p-4 h-full">
          <div className="flex items-center justify-between mb-8">
            <Link to="/admin" className="flex items-center gap-3" onClick={closeSidebar}>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg h-8 w-8 flex items-center justify-center text-white font-bold">
                E
              </div>
              <div className="font-bold text-xl text-sidebar-foreground">EduAdmin</div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden text-sidebar-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="space-y-1 flex-1 mt-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                icon={link.icon}
                active={pathname === link.href}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="pt-4 mt-auto border-t border-sidebar-border">
            <div className="flex items-center gap-3 p-3">
              <Avatar>
                <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                  {currentUser?.displayName?.charAt(0) || "A"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {currentUser?.displayName || "Admin User"}
                </p>
                <p className="text-xs text-sidebar-foreground/70 truncate">
                  {currentUser?.email || "admin@example.com"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-auto lg:ml-72">
        <div className="sticky top-0 z-30 bg-white border-b">
          <header className="px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          </header>
        </div>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
