
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { School, Play, Book, CheckCircle } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

// Sample training data
const trainingModules = [
  {
    id: "1",
    title: "Web Development Fundamentals",
    duration: "6 weeks",
    instructor: "Prof. Johnson",
    enrolledStudents: 45,
    completionRate: "78%"
  },
  {
    id: "2",
    title: "Machine Learning Basics",
    duration: "8 weeks",
    instructor: "Dr. Smith",
    enrolledStudents: 32,
    completionRate: "65%"
  },
  {
    id: "3",
    title: "Mobile App Development",
    duration: "10 weeks",
    instructor: "Prof. Williams",
    enrolledStudents: 28,
    completionRate: "82%"
  }
];

export default function TrainingModule() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Training Module</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard 
            title="Active Courses" 
            value="8" 
            icon={<Book className="h-6 w-6 text-blue-500" />} 
          />
          <StatsCard 
            title="Total Students" 
            value="105" 
            icon={<School className="h-6 w-6 text-green-500" />} 
          />
          <StatsCard 
            title="Completed Modules" 
            value="28" 
            icon={<CheckCircle className="h-6 w-6 text-orange-500" />} 
          />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <School className="h-5 w-5 mr-2" />
              <span>Available Training Modules</span>
            </CardTitle>
          </CardHeader>
          <CardContent>            
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Module Title</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Enrolled Students</TableHead>
                    <TableHead>Completion Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trainingModules.map((module) => (
                    <TableRow key={module.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Play className="h-4 w-4 mr-2 text-blue-500" />
                          {module.title}
                        </div>
                      </TableCell>
                      <TableCell>{module.duration}</TableCell>
                      <TableCell>{module.instructor}</TableCell>
                      <TableCell>{module.enrolledStudents}</TableCell>
                      <TableCell>{module.completionRate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

// Stats card component
function StatsCard({ 
  title, 
  value, 
  icon 
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
          </div>
          <div>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
