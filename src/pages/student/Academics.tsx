
import React, { useState, useEffect } from "react";
import StudentLayout from "@/components/layout/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Award, Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";

interface Course {
  id: string;
  code: string;
  name: string;
  grade: string;
  credits: number;
  attendance: string;
}

export default function Academics() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [currentSemester, setCurrentSemester] = useState({
    name: "Spring 2025",
    startDate: "January 15, 2025",
    endDate: "May 20, 2025",
    status: "In Progress"
  });

  const [courses, setCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState({
    cgpa: "0.00",
    creditsCompleted: 0,
    attendance: "0%",
    achievementPoints: 0
  });

  // Fetch student's academic records
  useEffect(() => {
    const fetchAcademicRecords = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const recordsCollection = collection(db, "academicRecords");
        // In a real app, you would filter by the student's ID
        // Here we're just getting all records for demo purposes
        // const q = query(recordsCollection, where("studentId", "==", user.uid), orderBy("createdAt", "desc"));
        const q = query(recordsCollection, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        // Transform to course format
        const fetchedCourses: Course[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          fetchedCourses.push({
            id: doc.id,
            code: `${data.subject.substring(0, 3).toUpperCase()}${Math.floor(Math.random() * 900) + 100}`,
            name: data.subject,
            grade: data.grade,
            credits: Math.floor(Math.random() * 3) + 2, // Random credits between 2-4
            attendance: data.attendance + "%"
          });
        });
        
        setCourses(fetchedCourses);
        
        // Calculate stats
        if (fetchedCourses.length > 0) {
          // Calculate CGPA
          const gradePoints: { [key: string]: number } = {
            "A+": 4.0, "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7,
            "C+": 2.3, "C": 2.0, "D": 1.0, "F": 0.0
          };
          
          let totalPoints = 0;
          let totalCredits = 0;
          let totalAttendance = 0;
          
          fetchedCourses.forEach(course => {
            if (gradePoints[course.grade]) {
              totalPoints += gradePoints[course.grade] * course.credits;
              totalCredits += course.credits;
            }
            totalAttendance += parseInt(course.attendance);
          });
          
          const avgCgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
          const avgAttendance = fetchedCourses.length > 0 ? 
            Math.round(totalAttendance / fetchedCourses.length).toString() + "%" : "0%";
          
          setStats({
            cgpa: avgCgpa,
            creditsCompleted: totalCredits,
            attendance: avgAttendance,
            achievementPoints: Math.floor(totalCredits * 2.5) // Just a demo calculation
          });
        }
        
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
    
    fetchAcademicRecords();
  }, [user, toast]);

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
                  <p className="text-3xl font-bold mt-1">{stats.cgpa}</p>
                </div>
                <GraduationCap className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Credits Completed</p>
                  <p className="text-3xl font-bold mt-1">{stats.creditsCompleted}</p>
                </div>
                <BookOpen className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Attendance</p>
                  <p className="text-3xl font-bold mt-1">{stats.attendance}</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Achievement Points</p>
                  <p className="text-3xl font-bold mt-1">{stats.achievementPoints}</p>
                </div>
                <Award className="h-8 w-8 text-purple-500" />
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
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="text-gray-500 mt-4">Loading your academic records...</p>
              </div>
            ) : (
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
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.code}</TableCell>
                        <TableCell>{course.name}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(course.grade)}`}>
                            {course.grade}
                          </span>
                        </TableCell>
                        <TableCell>{course.credits}</TableCell>
                        <TableCell>{course.attendance}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                        No courses registered for this semester
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}

// Helper function for grade color
function getGradeColor(grade: string) {
  switch(grade[0]) {
    case 'A': return "bg-green-100 text-green-800";
    case 'B': return "bg-blue-100 text-blue-800";
    case 'C': return "bg-yellow-100 text-yellow-800";
    case 'D': return "bg-orange-100 text-orange-800";
    case 'F': return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
}
