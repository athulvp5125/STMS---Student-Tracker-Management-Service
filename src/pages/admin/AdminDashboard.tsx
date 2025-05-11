
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Briefcase, FileText, TrendingUp, Bell } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome to the Student Tracking and Management System
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-sm text-gray-600">Last updated: Just now</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard 
            title="Students" 
            value="254" 
            description="Total registered students" 
            icon={<Users className="h-8 w-8 text-system-blue" />} 
            bgColor="bg-blue-50"
            increase="+12% from last month"
          />
          <DashboardCard 
            title="Academics" 
            value="1,204" 
            description="Academic records tracked" 
            icon={<GraduationCap className="h-8 w-8 text-system-purple" />}
            bgColor="bg-purple-50"
            increase="+5% from last month"
          />
          <DashboardCard 
            title="Placements" 
            value="78" 
            description="Students placed" 
            icon={<Briefcase className="h-8 w-8 text-system-orange" />} 
            bgColor="bg-orange-50"
            increase="+18% from last month"
          />
          <DashboardCard 
            title="Exams" 
            value="42" 
            description="Question papers generated" 
            icon={<FileText className="h-8 w-8 text-system-green" />} 
            bgColor="bg-green-50"
            increase="+8% from last month"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-education text-white">
              <CardTitle className="flex items-center text-white">
                <TrendingUp className="mr-2 h-5 w-5" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Student Attendance</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2 bg-gray-100" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average GPA</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2 bg-gray-100" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Placement Rate</span>
                    <span className="text-sm font-medium">62%</span>
                  </div>
                  <Progress value={62} className="h-2 bg-gray-100" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Course Completion</span>
                    <span className="text-sm font-medium">91%</span>
                  </div>
                  <Progress value={91} className="h-2 bg-gray-100" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardHeader className="bg-gradient-secondary text-white">
              <CardTitle className="flex items-center text-white">
                <Bell className="mr-2 h-5 w-5" />
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <li key={index} className="flex gap-4">
                    <div className={`w-2 h-2 mt-2 rounded-full ${activity.color} flex-shrink-0`} />
                    <div>
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <a href="#" className="text-sm text-primary font-medium hover:underline flex items-center">
                  View all notifications
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}

const recentActivities = [
  {
    title: "New student registration: Alex Johnson",
    time: "10 minutes ago",
    color: "bg-blue-500"
  },
  {
    title: "Placement update: 5 students placed at TechCorp",
    time: "1 hour ago",
    color: "bg-green-500"
  },
  {
    title: "Exam results published for CSE-303",
    time: "2 hours ago",
    color: "bg-purple-500"
  },
  {
    title: "Training session scheduled for next week",
    time: "3 hours ago",
    color: "bg-orange-500"
  },
  {
    title: "System maintenance completed",
    time: "Yesterday, 11:30 PM",
    color: "bg-gray-500"
  }
];

function DashboardCard({ 
  title, 
  value, 
  description, 
  icon,
  bgColor,
  increase
}: { 
  title: string; 
  value: string; 
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  increase: string;
}) {
  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
            <p className="text-xs text-green-600 font-medium mt-2">{increase}</p>
          </div>
          <div className={`${bgColor} p-3 rounded-full`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
