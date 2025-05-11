
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Plus, Search, User, Edit, Trash, UserPlus, Mail, Calendar, Award } from "lucide-react";
import { AddStudentForm } from "@/components/admin/AddStudentForm";
import { Badge } from "@/components/ui/badge";

// Define the student type
interface Student {
  id: string;
  name: string;
  email: string;
  admissionYear: string;
  cgpa: string;
  placementStatus: string;
}

// Initial sample student data for the table
const initialStudents = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    admissionYear: "2022",
    cgpa: "3.8",
    placementStatus: "Not Placed"
  },
  {
    id: "2",
    name: "Emily Wilson",
    email: "emily.wilson@example.com",
    admissionYear: "2021",
    cgpa: "3.5",
    placementStatus: "Placed"
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    admissionYear: "2022",
    cgpa: "3.9",
    placementStatus: "Not Placed"
  },
  {
    id: "4",
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    admissionYear: "2023",
    cgpa: "3.7",
    placementStatus: "In Process"
  },
  {
    id: "5",
    name: "James Rodriguez",
    email: "james.rodriguez@example.com",
    admissionYear: "2021",
    cgpa: "3.6",
    placementStatus: "Placed"
  },
  {
    id: "6",
    name: "Lisa Wang",
    email: "lisa.wang@example.com",
    admissionYear: "2023",
    cgpa: "4.0",
    placementStatus: "Not Placed"
  }
];

export default function StudentsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  
  // Filter students based on search query
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle adding a new student
  const handleAddStudent = (newStudent: Student) => {
    setStudents(prevStudents => [...prevStudents, newStudent]);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Student Management</h1>
            <p className="text-gray-600 mt-1">View and manage all registered students</p>
          </div>
          <Button 
            className="bg-gradient-primary hover:opacity-90"
            onClick={() => setIsAddStudentOpen(true)}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Student
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard 
            title="Total Students" 
            value={students.length.toString()} 
            icon={<User className="h-6 w-6 text-blue-500" />}
            color="bg-blue-50"
          />
          <StatCard 
            title="Placement Rate" 
            value={`${Math.round((students.filter(s => s.placementStatus === "Placed").length / students.length) * 100)}%`} 
            icon={<Award className="h-6 w-6 text-purple-500" />}
            color="bg-purple-50"
          />
          <StatCard 
            title="Average CGPA" 
            value={`${(students.reduce((acc, student) => acc + parseFloat(student.cgpa), 0) / students.length).toFixed(2)}`} 
            icon={<Award className="h-6 w-6 text-green-500" />}
            color="bg-green-50"
          />
        </div>

        <Card className="border-0 shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-primary text-white">
            <CardTitle className="flex items-center text-white">
              <User className="mr-2 h-5 w-5" />
              <span>Students Directory</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name or email..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select className="px-4 py-2 rounded-md border border-gray-200 text-sm">
                  <option>All Years</option>
                  <option>2023</option>
                  <option>2022</option>
                  <option>2021</option>
                </select>
                <select className="px-4 py-2 rounded-md border border-gray-200 text-sm">
                  <option>All Placements</option>
                  <option>Placed</option>
                  <option>Not Placed</option>
                  <option>In Process</option>
                </select>
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-medium">Name</TableHead>
                    <TableHead className="font-medium">Email</TableHead>
                    <TableHead className="font-medium">Admission Year</TableHead>
                    <TableHead className="font-medium">CGPA</TableHead>
                    <TableHead className="font-medium">Placement Status</TableHead>
                    <TableHead className="text-right font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center">
                            <div className="h-9 w-9 rounded-full bg-gradient-primary text-white flex items-center justify-center font-medium text-sm mr-3">
                              {student.name.charAt(0)}
                            </div>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-gray-400 mr-2" />
                            {student.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                            {student.admissionYear}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{student.cgpa}</TableCell>
                        <TableCell>
                          <PlacementBadge status={student.placementStatus} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" className="h-8 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700">
                              <Edit className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                              <Trash className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No students found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="text-gray-500">
                Showing {filteredStudents.length} out of {students.length} students
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-primary/5">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Add Student Form Dialog */}
      <AddStudentForm 
        open={isAddStudentOpen} 
        onClose={() => setIsAddStudentOpen(false)}
        onAddStudent={handleAddStudent}
      />
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

function PlacementBadge({ status }: { status: string }) {
  const getStatusStyles = () => {
    switch(status) {
      case "Placed": 
        return "bg-green-100 text-green-800 border-green-200";
      case "In Process": 
        return "bg-blue-100 text-blue-800 border-blue-200";
      default: 
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  }
  
  return (
    <Badge variant="outline" className={`${getStatusStyles()} rounded-full font-medium px-3 py-1 border`}>
      {status}
    </Badge>
  );
}
