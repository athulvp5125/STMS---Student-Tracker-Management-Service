
import React from "react";
import StudentLayout from "@/components/layout/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, FileText, AlertTriangle } from "lucide-react";

export default function Exams() {
  // Sample exams data
  const upcomingExams = [
    {
      id: "1",
      subject: "Advanced Database Systems",
      date: "May 20, 2025",
      time: "10:00 AM - 1:00 PM",
      duration: "3 hours",
      venue: "Hall A, Main Building",
      status: "Upcoming"
    },
    {
      id: "2",
      subject: "Web Application Development",
      date: "May 25, 2025",
      time: "2:00 PM - 5:00 PM",
      duration: "3 hours",
      venue: "Computer Lab B",
      status: "Upcoming"
    }
  ];

  const pastExams = [
    {
      id: "3",
      subject: "Data Structures",
      date: "April 15, 2025",
      score: "85/100",
      grade: "A",
      status: "Passed"
    },
    {
      id: "4",
      subject: "Computer Networks",
      date: "April 5, 2025",
      score: "78/100",
      grade: "B+",
      status: "Passed"
    },
    {
      id: "5",
      subject: "Operating Systems",
      date: "March 25, 2025",
      score: "92/100",
      grade: "A+",
      status: "Passed"
    }
  ];

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Exams</h1>
          <p className="text-gray-500 mt-1">View your exam schedule and results</p>
        </div>

        {upcomingExams.length > 0 && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 text-yellow-800">
                <AlertTriangle className="h-5 w-5" />
                <p className="font-medium">You have {upcomingExams.length} upcoming exams scheduled!</p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" /> Upcoming Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingExams.length > 0 ? (
              <div className="space-y-4">
                {upcomingExams.map((exam) => (
                  <div key={exam.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{exam.subject}</h3>
                        <div className="text-sm text-gray-500 mt-1">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {exam.date}
                          </div>
                          <div className="flex items-center mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            {exam.time} ({exam.duration})
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{exam.status}</Badge>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm"><span className="font-medium">Venue:</span> {exam.venue}</p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button size="sm">View Details</Button>
                      <Button size="sm" variant="outline">Study Materials</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-6">No upcoming exams scheduled</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" /> Past Exam Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pastExams.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastExams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">{exam.subject}</TableCell>
                      <TableCell>{exam.date}</TableCell>
                      <TableCell>{exam.score}</TableCell>
                      <TableCell>{exam.grade}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{exam.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-gray-500 py-6">No past exam results</p>
            )}
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
