
import React from "react";
import StudentLayout from "@/components/layout/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Building, Calendar, CheckCircle2, Clock } from "lucide-react";

export default function Placements() {
  // Sample placement data
  const upcomingEvents = [
    {
      id: "1",
      company: "Tech Solutions Inc.",
      position: "Software Engineer",
      date: "May 15, 2025",
      time: "10:00 AM",
      status: "Upcoming",
      location: "Main Campus, Building B, Room 305"
    },
    {
      id: "2",
      company: "Global Innovations",
      position: "Web Developer",
      date: "May 18, 2025",
      time: "2:30 PM",
      status: "Upcoming",
      location: "Virtual (Zoom)"
    }
  ];

  const pastEvents = [
    {
      id: "3",
      company: "DataTech Solutions",
      position: "Data Analyst",
      date: "April 25, 2025",
      result: "Shortlisted for next round"
    },
    {
      id: "4",
      company: "Quantum Software",
      position: "Frontend Developer",
      date: "April 10, 2025",
      result: "Rejected"
    }
  ];

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Placements</h1>
          <p className="text-gray-500 mt-1">Manage your career opportunities and placement activities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Placement Status</p>
                  <p className="text-3xl font-bold mt-1">Active</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Upcoming Interviews</p>
                  <p className="text-3xl font-bold mt-1">{upcomingEvents.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-system-blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Applications</p>
                  <p className="text-3xl font-bold mt-1">{upcomingEvents.length + pastEvents.length}</p>
                </div>
                <Briefcase className="h-8 w-8 text-system-indigo" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" /> Upcoming Placement Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{event.company}</h3>
                      <p className="text-gray-600">{event.position}</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{event.status}</Badge>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Building className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button size="sm">View Details</Button>
                    <Button size="sm" variant="outline">Prepare</Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-6">No upcoming placement events</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" /> Past Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pastEvents.length > 0 ? (
              <div className="space-y-3">
                {pastEvents.map((event) => (
                  <div key={event.id} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <h4 className="font-medium">{event.company}</h4>
                      <p className="text-sm text-gray-600">{event.position} • {event.date}</p>
                    </div>
                    <div>
                      <Badge 
                        className={event.result.includes("Shortlisted") ? 
                          "bg-green-100 text-green-800 hover:bg-green-100" : 
                          "bg-red-100 text-red-800 hover:bg-red-100"}
                      >
                        {event.result}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-6">No past applications</p>
            )}
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
