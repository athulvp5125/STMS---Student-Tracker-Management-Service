
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Briefcase, FileText } from "lucide-react";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">
          Welcome to the Student Tracking and Management System. Use the dashboard to manage students, academics, placements, and exams.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard 
            title="Students" 
            value="0" 
            description="Total registered students" 
            icon={<Users className="h-8 w-8 text-system-blue" />} 
          />
          <DashboardCard 
            title="Academics" 
            value="0" 
            description="Academic records tracked" 
            icon={<GraduationCap className="h-8 w-8 text-system-green" />} 
          />
          <DashboardCard 
            title="Placements" 
            value="0" 
            description="Students placed" 
            icon={<Briefcase className="h-8 w-8 text-system-orange" />} 
          />
          <DashboardCard 
            title="Exams" 
            value="0" 
            description="Question papers generated" 
            icon={<FileText className="h-8 w-8 text-system-indigo" />} 
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-8">No recent activities to display</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-8">No upcoming events scheduled</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}

function DashboardCard({ 
  title, 
  value, 
  description, 
  icon 
}: { 
  title: string; 
  value: string; 
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
          <div>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
