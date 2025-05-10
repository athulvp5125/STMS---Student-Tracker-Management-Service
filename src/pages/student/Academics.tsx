
import React from "react";
import StudentLayout from "@/components/layout/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Award, Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Academics() {
  // Sample academic data
  const currentSemester = {
    name: "Spring 2025",
    startDate: "January 15, 2025",
    endDate: "May 20, 2025",
    status: "In Progress"
  };

  const courses = [
    { code: "CSE101", name: "Introduction to Computer Science", grade: "A", credits: 4, attendance: "92%" },
    { code: "MAT201", name: "Advanced Mathematics", grade: "B+", credits: 3, attendance: "88%" },
    { code: "PHY105", name: "Physics I", grade: "A-", credits: 4, attendance: "95%" },
    { code: "ENG203", name: "Technical Writing", grade: "B", credits: 2, attendance: "90%" }
  ];

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Academic Records</h1>
          <p className="text-gray-500 mt-1">View your academic performance and course details</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">CGPA</p>
                  <p className="text-3xl font-bold mt-1">3.75</p>
                </div>
                <GraduationCap className="h-8 w-8 text-system-blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Credits Completed</p>
                  <p className="text-3xl font-bold mt-1">48</p>
                </div>
                <BookOpen className="h-8 w-8 text-system-green" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Attendance</p>
                  <p className="text-3xl font-bold mt-1">92%</p>
                </div>
                <Calendar className="h-8 w-8 text-system-orange" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Achievement Points</p>
                  <p className="text-3xl font-bold mt-1">120</p>
                </div>
                <Award className="h-8 w-8 text-system-indigo" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Semester: {currentSemester.name}</CardTitle>
            <p className="text-sm text-gray-500">
              {currentSemester.startDate} - {currentSemester.endDate} • {currentSemester.status}
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Code</TableHead>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Attendance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.code}>
                    <TableCell className="font-medium">{course.code}</TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.grade}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>{course.attendance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
