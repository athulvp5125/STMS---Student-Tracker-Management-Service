
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar, Clock, Users, Search, Plus, Filter, Download } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

// Sample exam data
const exams = [
  {
    id: "1",
    title: "Mid-Term Examination",
    date: "2025-10-15",
    duration: "3 hours",
    subjects: ["Data Structures", "DBMS", "Computer Networks"],
    status: "Completed",
    participants: 120
  },
  {
    id: "2",
    title: "End Semester Examination",
    date: "2025-12-10",
    duration: "3 hours",
    subjects: ["Operating Systems", "Web Technologies", "Machine Learning"],
    status: "Scheduled",
    participants: 150
  },
  {
    id: "3",
    title: "Practical Assessment",
    date: "2025-11-20",
    duration: "4 hours",
    subjects: ["Programming Lab", "Database Lab"],
    status: "Scheduled",
    participants: 80
  },
  {
    id: "4",
    title: "Quiz 1",
    date: "2025-09-05",
    duration: "1 hour",
    subjects: ["Computer Architecture"],
    status: "Completed",
    participants: 95
  },
  {
    id: "5",
    title: "Programming Contest",
    date: "2025-11-08",
    duration: "5 hours",
    subjects: ["Competitive Programming"],
    status: "Scheduled",
    participants: 75
  }
];

export default function ExamManagement() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Exam Management</h1>
            <p className="text-gray-600 mt-1">Schedule and manage examinations</p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Create New Exam
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <StatsCard 
            title="Total Exams" 
            value="24" 
            icon={<FileText className="h-6 w-6 text-blue-500" />}
            color="bg-blue-50"
          />
          <StatsCard 
            title="Upcoming" 
            value="12" 
            icon={<Calendar className="h-6 w-6 text-purple-500" />}
            color="bg-purple-50"
          />
          <StatsCard 
            title="Average Score" 
            value="76%" 
            icon={<Users className="h-6 w-6 text-orange-500" />}
            color="bg-orange-50"
          />
          <StatsCard 
            title="Pass Rate" 
            value="89%" 
            icon={<FileText className="h-6 w-6 text-green-500" />}
            color="bg-green-50"
          />
        </div>
        
        <Card className="border-0 shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-secondary text-white">
            <CardTitle className="flex items-center text-white">
              <FileText className="mr-2 h-5 w-5" />
              <span>Exam Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search exams..."
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-gray-600">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="text-gray-600">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-medium">Exam Title</TableHead>
                    <TableHead className="font-medium">Date</TableHead>
                    <TableHead className="font-medium">Duration</TableHead>
                    <TableHead className="font-medium">Subjects</TableHead>
                    <TableHead className="font-medium">Participants</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exams.map((exam) => (
                    <TableRow key={exam.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {exam.title}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          {new Date(exam.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-2" />
                          {exam.duration}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {exam.subjects.map((subject, idx) => (
                            <span 
                              key={idx} 
                              className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-400 mr-2" />
                          {exam.participants}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={exam.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="text-gray-500">
                Showing {exams.length} out of {exams.length} exams
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
        
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Upcoming Examinations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exams
                .filter(exam => exam.status === "Scheduled")
                .slice(0, 3)
                .map((exam, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-md hover:bg-gray-50">
                    <div className="h-12 w-12 bg-purple-100 text-purple-500 rounded-full flex items-center justify-center">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-lg truncate">{exam.title}</h3>
                      <p className="text-sm text-gray-500">{new Date(exam.date).toLocaleDateString('en-US', { 
                        weekday: 'short',
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                ))
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

function StatusBadge({ status }: { status: string }) {
  const getStatusStyles = () => {
    switch(status) {
      case "Completed": 
        return "bg-green-100 text-green-800 border-green-200";
      case "Scheduled": 
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Cancelled": 
        return "bg-red-100 text-red-800 border-red-200";
      default: 
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }
  
  return (
    <Badge variant="outline" className={`${getStatusStyles()} rounded-full font-medium px-3 py-1 border`}>
      {status}
    </Badge>
  );
}

// Stats card component
function StatsCard({ 
  title, 
  value, 
  icon,
  color
}: { 
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
