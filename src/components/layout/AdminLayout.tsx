
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { 
  LogOut, 
  Home, 
  Users, 
  GraduationCap, 
  Briefcase, 
  FileText, 
  Settings 
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar defaultCollapsed={false}>
        <SidebarHeader className="flex flex-col items-center justify-center p-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">STMS Admin</h2>
          <p className="text-sm text-gray-600 mt-1">
            {currentUser?.displayName || currentUser?.email}
          </p>
        </SidebarHeader>
        
        <SidebarContent className="flex flex-col py-4">
          <SidebarNavItem icon={Home} label="Dashboard" path="/admin" />
          <SidebarNavItem icon={Users} label="Student Management" path="/admin/students" />
          <SidebarNavItem icon={GraduationCap} label="Academic Records" path="/admin/academics" />
          <SidebarNavItem icon={Briefcase} label="Placement Management" path="/admin/placements" />
          <SidebarNavItem icon={FileText} label="Training Module" path="/admin/training" />
          <SidebarNavItem icon={FileText} label="Exam Management" path="/admin/exams" />
          <SidebarNavItem icon={Settings} label="Settings" path="/admin/settings" />
        </SidebarContent>
        
        <SidebarFooter className="p-4 border-t mt-auto">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Log Out
          </Button>
        </SidebarFooter>
      </Sidebar>
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

function SidebarNavItem({ 
  icon: Icon, 
  label, 
  path 
}: { 
  icon: React.ElementType; 
  label: string; 
  path: string;
}) {
  const navigate = useNavigate();
  const isActive = location.pathname === path;
  
  return (
    <button
      onClick={() => navigate(path)}
      className={`flex items-center gap-3 px-4 py-3 text-left w-full hover:bg-gray-200 transition-colors ${
        isActive ? "bg-gray-200 font-medium" : ""
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );
}
