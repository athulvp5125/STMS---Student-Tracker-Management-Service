
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar, Clock, Users } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

// Sample exam data
const exams = [
  {
    id: "1",
    title: "Mid-Term Examination",
    date: "2023-10-15",
    duration: "3 hours",
    subjects: ["Data Structures", "DBMS", "Computer Networks"],
    status: "Completed"
  },
  {
    id: "2",
    title: "End Semester Examination",
    date: "2023-12-10",
    duration: "3 hours",
    subjects: ["Operating Systems", "Web Technologies", "Machine Learning"],
    status: "Scheduled"
  },
  {
    id: "3",
    title: "Practical Assessment",
    date: "2023-11-20",
    duration: "4 hours",
    subjects: ["Programming Lab", "Database Lab"],
    status: "Scheduled"
  }
];

export default function ExamManagement() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Exam Management</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard 
            title="Total Exams" 
            value="12" 
            icon={<FileText className="h-6 w-6 text-blue-500" />} 
          />
          <StatsCard 
            title="Upcoming" 
            value="5" 
            icon={<Calendar className="h-6 w-6 text-green-500" />} 
          />
          <StatsCard 
            title="Average Score" 
            value="72%" 
            icon={<Users className="h-6 w-6 text-orange-500" />} 
          />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 mr-2" />
              <span>Exam Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent>            
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exam Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Subjects</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">
                        {exam.title}
                      </TableCell>
                      <TableCell>{new Date(exam.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          {exam.duration}
                        </div>
                      </TableCell>
                      <TableCell>{exam.subjects.join(", ")}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          exam.status === "Completed" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {exam.status}
                        </span>
                      </TableCell>
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
