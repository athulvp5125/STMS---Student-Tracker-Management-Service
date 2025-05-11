
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
import { Plus, Search, User, Edit, Trash } from "lucide-react";
import { AddStudentForm } from "@/components/admin/AddStudentForm";

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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Student Management</h1>
          <Button 
            className="bg-system-blue hover:bg-blue-700"
            onClick={() => setIsAddStudentOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Student
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Students Directory</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Admission Year</TableHead>
                    <TableHead>CGPA</TableHead>
                    <TableHead>Placement Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.admissionYear}</TableCell>
                        <TableCell>{student.cgpa}</TableCell>
                        <TableCell>
                          <div className={`inline-block px-2 py-1 rounded-full text-xs ${
                            student.placementStatus === "Placed" 
                              ? "bg-green-100 text-green-800" 
                              : student.placementStatus === "In Process"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {student.placementStatus}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        No students found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
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
