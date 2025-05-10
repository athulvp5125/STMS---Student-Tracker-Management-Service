
import React from "react";
import StudentLayout from "@/components/layout/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { User, GraduationCap, Briefcase, Calendar } from "lucide-react";

export default function StudentDashboard() {
  const { currentUser } = useAuth();

  return (
    <StudentLayout>
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-system-blue to-system-indigo h-32"></div>
          <CardContent className="-mt-16 relative">
            <div className="h-24 w-24 rounded-full bg-white p-1 shadow-lg mx-auto mb-4">
              <div className="h-full w-full rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-12 w-12 text-gray-400" />
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">
                {currentUser?.displayName || "Student Name"}
              </h1>
              <p className="text-gray-600">{currentUser?.email}</p>
              <div className="mt-2 inline-block bg-blue-100 text-system-blue text-sm px-3 py-1 rounded-full">
                Student
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <InfoCard
                icon={<GraduationCap className="h-5 w-5" />}
                label="Current CGPA"
                value="Not Available"
              />
              <InfoCard
                icon={<Briefcase className="h-5 w-5" />}
                label="Placement Status"
                value="Not Placed"
              />
              <InfoCard
                icon={<Calendar className="h-5 w-5" />}
                label="Year of Admission"
                value="Not Set"
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="mr-2 h-5 w-5" />
                Academic Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ProgressItem label="Profile Completion" value={0} />
              <ProgressItem label="Attendance Rate" value={0} />
              <ProgressItem label="Assignment Completion" value={0} />
              <ProgressItem label="Training Modules Completed" value={0} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-6">No upcoming events scheduled</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </StudentLayout>
  );
}

function InfoCard({ 
  icon, 
  label, 
  value 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string;
}) {
  return (
    <div className="bg-gray-50 p-4 rounded-md border flex flex-col items-center">
      <div className="text-gray-600 mb-1">{icon}</div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="font-semibold mt-1">{value}</div>
    </div>
  );
}

function ProgressItem({ 
  label, 
  value 
}: { 
  label: string; 
  value: number;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm">{label}</span>
        <span className="text-sm font-medium">{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );
}
