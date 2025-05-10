
import React from "react";
import StudentLayout from "@/components/layout/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle, Lock, Play } from "lucide-react";

export default function Training() {
  // Sample training data
  const modules = [
    {
      id: "1",
      title: "Introduction to Web Development",
      description: "Learn the basics of HTML, CSS, and JavaScript",
      progress: 100,
      status: "Completed",
      lessons: 12,
      duration: "6 hours"
    },
    {
      id: "2",
      title: "React Fundamentals",
      description: "Master React basics with hands-on examples",
      progress: 60,
      status: "In Progress",
      lessons: 15,
      duration: "8 hours"
    },
    {
      id: "3",
      title: "Backend Development",
      description: "Learn Node.js, Express and MongoDB for backend",
      progress: 0,
      status: "Locked",
      lessons: 18,
      duration: "10 hours"
    },
  ];

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Training Modules</h1>
          <p className="text-gray-500 mt-1">Access your training courses and track your progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Modules Completed</p>
                  <p className="text-3xl font-bold mt-1">1</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">In Progress</p>
                  <p className="text-3xl font-bold mt-1">1</p>
                </div>
                <Play className="h-8 w-8 text-system-blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Hours</p>
                  <p className="text-3xl font-bold mt-1">24</p>
                </div>
                <BookOpen className="h-8 w-8 text-system-indigo" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Training Modules</h2>
          
          {modules.map((module) => (
            <Card key={module.id} className="overflow-hidden">
              <div className={`h-2 ${
                module.status === "Completed" 
                  ? "bg-green-500" 
                  : module.status === "In Progress" 
                    ? "bg-blue-500" 
                    : "bg-gray-200"
              }`}></div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <Badge className={`${
                    module.status === "Completed" 
                      ? "bg-green-100 text-green-800" 
                      : module.status === "In Progress" 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-gray-100 text-gray-800"
                  }`}>
                    {module.status}
                  </Badge>
                </div>
                <p className="text-gray-500 text-sm">{module.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} />
                  
                  <div className="flex justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {module.lessons} Lessons
                    </div>
                    <div>{module.duration}</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t">
                <div className="w-full">
                  <Button 
                    className="w-full"
                    disabled={module.status === "Locked"}
                  >
                    {module.status === "Completed" 
                      ? "Review Module" 
                      : module.status === "In Progress" 
                        ? "Continue Learning" 
                        : (
                          <>
                            <Lock className="h-4 w-4 mr-2" />
                            Locked
                          </>
                        )
                    }
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
