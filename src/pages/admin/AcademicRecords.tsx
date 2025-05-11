
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

// Sample academic data
const academicRecords = [
  {
    id: "1",
    studentName: "Alex Johnson",
    semester: "3rd",
    subject: "Data Structures",
    grade: "A",
    attendance: "92%"
  },
  {
    id: "2",
    studentName: "Emily Wilson",
    semester: "3rd",
    subject: "Database Management",
    grade: "B+",
    attendance: "88%"
  },
  {
    id: "3",
    studentName: "Michael Brown",
    semester: "3rd",
    subject: "Computer Networks",
    grade: "A-",
    attendance: "95%"
  }
];

export default function AcademicRecords() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Academic Records</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5" />
              <span>Student Academic Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>            
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Attendance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {academicRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.studentName}</TableCell>
                      <TableCell>{record.semester}</TableCell>
                      <TableCell>{record.subject}</TableCell>
                      <TableCell>{record.grade}</TableCell>
                      <TableCell>{record.attendance}</TableCell>
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
