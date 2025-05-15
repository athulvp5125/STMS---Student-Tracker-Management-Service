
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Search, Plus, FileText, Calendar, X } from "lucide-react";
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
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";

// Create a type for academic records
interface AcademicRecord {
  id: string;
  studentName: string;
  semester: string;
  subject: string;
  grade: string;
  attendance: string;
  createdAt?: Date;
}

export default function AcademicRecords() {
  const { toast } = useToast();
  const [academicRecords, setAcademicRecords] = useState<AcademicRecord[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("All Semesters");
  const [loading, setLoading] = useState(true);
  
  // Form state for new record
  const [newRecord, setNewRecord] = useState({
    studentName: "",
    semester: "",
    subject: "",
    grade: "",
    attendance: ""
  });

  // Fetch records from Firestore
  const fetchRecords = async () => {
    setLoading(true);
    try {
      const recordsCollection = collection(db, "academicRecords");
      const recordsQuery = query(recordsCollection, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(recordsQuery);
      
      const records: AcademicRecord[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<AcademicRecord, "id">;
        records.push({
          id: doc.id,
          studentName: data.studentName,
          semester: data.semester,
          subject: data.subject,
          grade: data.grade,
          attendance: data.attendance
        });
      });
      
      setAcademicRecords(records);
    } catch (error) {
      console.error("Error fetching academic records:", error);
      toast({
        title: "Error",
        description: "Failed to load academic records",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Load academic records on component mount
  useEffect(() => {
    fetchRecords();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({ ...prev, [name]: value }));
  };

  // Handle add new record
  const handleAddRecord = async () => {
    // Validate form
    if (!newRecord.studentName || !newRecord.semester || !newRecord.subject || !newRecord.grade || !newRecord.attendance) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    try {
      // Add document to Firestore
      const recordsCollection = collection(db, "academicRecords");
      await addDoc(recordsCollection, {
        ...newRecord,
        createdAt: new Date()
      });
      
      // Reset form and close dialog
      setNewRecord({
        studentName: "",
        semester: "",
        subject: "",
        grade: "",
        attendance: ""
      });
      
      setIsDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Academic record has been added successfully"
      });
      
      // Refresh records
      fetchRecords();
    } catch (error) {
      console.error("Error adding record:", error);
      toast({
        title: "Error",
        description: "Failed to add academic record",
        variant: "destructive"
      });
    }
  };

  // Handle delete record
  const handleDeleteRecord = async (id: string) => {
    try {
      await deleteDoc(doc(db, "academicRecords", id));
      toast({
        title: "Success",
        description: "Record deleted successfully"
      });
      // Refresh records
      fetchRecords();
    } catch (error) {
      console.error("Error deleting record:", error);
      toast({
        title: "Error",
        description: "Failed to delete record",
        variant: "destructive"
      });
    }
  };

  // Filter records by search query and semester
  const filteredRecords = academicRecords.filter(record => {
    const matchesSearch = 
      record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSemester = selectedSemester === "All Semesters" || record.semester === selectedSemester;
    
    return matchesSearch && matchesSemester;
  });

  // Get unique semesters for filter dropdown
  const uniqueSemesters = Array.from(new Set(academicRecords.map(record => record.semester)));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Academic Records</h1>
            <p className="text-gray-600 mt-1">Manage and track student academic performance</p>
          </div>
          <Button 
            className="bg-gradient-primary hover:opacity-90"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Record
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard 
            title="Average GPA" 
            value={academicRecords.length ? calculateAverageGPA(academicRecords) : "0"} 
            icon={<FileText className="h-6 w-6 text-blue-500" />}
            color="bg-blue-50"
          />
          <StatCard 
            title="Courses" 
            value={Array.from(new Set(academicRecords.map(r => r.subject))).length.toString()} 
            icon={<GraduationCap className="h-6 w-6 text-purple-500" />}
            color="bg-purple-50"
          />
          <StatCard 
            title="Semesters" 
            value={uniqueSemesters.length.toString()} 
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
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by student name or subject..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select 
                className="px-4 py-2 rounded-md border border-gray-200 text-sm"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
              >
                <option>All Semesters</option>
                {uniqueSemesters.map((semester) => (
                  <option key={semester}>{semester}</option>
                ))}
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
                    <TableHead className="font-medium text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="flex justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Loading records...</p>
                      </TableCell>
                    </TableRow>
                  ) : filteredRecords.length > 0 ? (
                    filteredRecords.map((record) => (
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
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteRecord(record.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-100"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No academic records found. Add a new record to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            {filteredRecords.length > 0 && (
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="text-gray-500">
                  Showing {filteredRecords.length} records
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialog for adding new academic record */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Academic Record</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-3">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="studentName">Student Name</Label>
              <Input 
                id="studentName" 
                name="studentName"
                value={newRecord.studentName}
                onChange={handleInputChange}
                placeholder="Enter student name" 
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="semester">Semester</Label>
              <select 
                id="semester"
                name="semester"
                value={newRecord.semester}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input px-3 py-2"
              >
                <option value="">Select Semester</option>
                <option value="1st Semester">1st Semester</option>
                <option value="2nd Semester">2nd Semester</option>
                <option value="3rd Semester">3rd Semester</option>
                <option value="4th Semester">4th Semester</option>
              </select>
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject"
                name="subject" 
                value={newRecord.subject}
                onChange={handleInputChange}
                placeholder="Enter subject name" 
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="grade">Grade</Label>
              <select 
                id="grade"
                name="grade"
                value={newRecord.grade}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input px-3 py-2"
              >
                <option value="">Select Grade</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
              </select>
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="attendance">Attendance (%)</Label>
              <Input 
                id="attendance"
                name="attendance" 
                type="number"
                min="0"
                max="100"
                value={newRecord.attendance}
                onChange={handleInputChange}
                placeholder="Enter attendance percentage" 
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={handleAddRecord}>Add Record</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}

// Helper function to calculate average GPA
function calculateAverageGPA(records: AcademicRecord[]): string {
  if (records.length === 0) return "0";
  
  const gradePoints: { [key: string]: number } = {
    "A+": 4.0,
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "D": 1.0,
    "F": 0.0
  };
  
  let totalPoints = 0;
  let validRecords = 0;
  
  records.forEach(record => {
    if (gradePoints[record.grade] !== undefined) {
      totalPoints += gradePoints[record.grade];
      validRecords++;
    }
  });
  
  return validRecords > 0 ? (totalPoints / validRecords).toFixed(2) : "0";
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
