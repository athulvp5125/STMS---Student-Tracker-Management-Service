
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Search, Plus, FileText, Calendar } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Sample academic data with more records
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
  },
  {
    id: "4",
    studentName: "Sarah Davis",
    semester: "4th",
    subject: "Operating Systems",
    grade: "A",
    attendance: "94%"
  },
  {
    id: "5",
    studentName: "David Miller",
    semester: "4th",
    subject: "Artificial Intelligence",
    grade: "B",
    attendance: "82%"
  },
  {
    id: "6",
    studentName: "Jessica Taylor",
    semester: "4th",
    subject: "Web Development",
    grade: "A+",
    attendance: "98%"
  },
];

export default function AcademicRecords() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Academic Records</h1>
            <p className="text-gray-600 mt-1">Manage and track student academic performance</p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Add New Record
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard 
            title="Average GPA" 
            value="3.7" 
            icon={<FileText className="h-6 w-6 text-blue-500" />}
            color="bg-blue-50"
          />
          <StatCard 
            title="Courses" 
            value="24" 
            icon={<GraduationCap className="h-6 w-6 text-purple-500" />}
            color="bg-purple-50"
          />
          <StatCard 
            title="Semesters" 
            value="8" 
            icon={<Calendar className="h-6 w-6 text-green-500" />}
            color="bg-green-50"
          />
        </div>
        
        <Card className="border-0 shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-education text-white">
            <CardTitle className="flex items-center text-white">
              <GraduationCap className="mr-2 h-5 w-5" />
              <span>Student Academic Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by student name or subject..."
                  className="pl-10"
                />
              </div>
              <select className="px-4 py-2 rounded-md border border-gray-200 text-sm">
                <option>All Semesters</option>
                <option>1st Semester</option>
                <option>2nd Semester</option>
                <option>3rd Semester</option>
                <option>4th Semester</option>
              </select>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-medium">Student Name</TableHead>
                    <TableHead className="font-medium">Semester</TableHead>
                    <TableHead className="font-medium">Subject</TableHead>
                    <TableHead className="font-medium">Grade</TableHead>
                    <TableHead className="font-medium">Attendance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {academicRecords.map((record) => (
                    <TableRow key={record.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{record.studentName}</TableCell>
                      <TableCell>{record.semester}</TableCell>
                      <TableCell>{record.subject}</TableCell>
                      <TableCell>
                        <GradeTag grade={record.grade} />
                      </TableCell>
                      <TableCell>
                        <AttendanceBar attendance={parseInt(record.attendance)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="text-gray-500">
                Showing 6 out of 42 records
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-primary/5">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value, icon, color }: { 
  title: string; 
  value: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Card className="border-0 shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className={`${color} p-3 rounded-full`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function GradeTag({ grade }: { grade: string }) {
  const getGradeColor = (grade: string) => {
    switch(grade[0]) {
      case 'A': return "bg-green-100 text-green-800";
      case 'B': return "bg-blue-100 text-blue-800";
      case 'C': return "bg-yellow-100 text-yellow-800";
      case 'D': return "bg-orange-100 text-orange-800";
      case 'F': return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  }
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(grade)}`}>
      {grade}
    </span>
  );
}

function AttendanceBar({ attendance }: { attendance: number }) {
  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return "bg-green-500";
    if (attendance >= 80) return "bg-blue-500";
    if (attendance >= 70) return "bg-yellow-500";
    if (attendance >= 60) return "bg-orange-500";
    return "bg-red-500";
  }
  
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${getAttendanceColor(attendance)}`}
          style={{ width: `${attendance}%` }}
        />
      </div>
      <span className="text-xs">{attendance}%</span>
    </div>
  );
}
