
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Briefcase, 
  BuildingIcon, 
  BarChart2,
  Users
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

// Sample data
const placementStats = {
  totalEligible: 120,
  totalPlaced: 78,
  totalCompanies: 15,
  averagePackage: "6.2 LPA",
  highestPackage: "18 LPA",
  placementRatio: "65%"
};

const recentCompanies = [
  { 
    id: "1", 
    name: "TechSoft Solutions", 
    date: "2023-04-15", 
    studentsPlaced: 12, 
    averagePackage: "7.5 LPA" 
  },
  { 
    id: "2", 
    name: "Global Innovations", 
    date: "2023-03-22", 
    studentsPlaced: 8, 
    averagePackage: "8.2 LPA" 
  },
  { 
    id: "3", 
    name: "NextGen Systems", 
    date: "2023-02-18", 
    studentsPlaced: 15, 
    averagePackage: "6.8 LPA" 
  }
];

const topPerformers = [
  { 
    id: "1", 
    name: "Alex Johnson", 
    company: "TechSoft Solutions", 
    package: "12 LPA", 
    cgpa: "3.9"
  },
  { 
    id: "2", 
    name: "Priya Sharma", 
    company: "Global Innovations", 
    package: "14 LPA", 
    cgpa: "3.8"
  },
  { 
    id: "3", 
    name: "David Wilson", 
    company: "NextGen Systems", 
    package: "18 LPA", 
    cgpa: "4.0"
  }
];

export default function PlacementManagement() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Placement Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Placement Rate" 
            value={placementStats.placementRatio} 
            icon={<Users className="h-8 w-8 text-system-blue" />} 
          />
          <StatCard 
            title="Average Package" 
            value={placementStats.averagePackage} 
            icon={<BarChart2 className="h-8 w-8 text-system-green" />} 
          />
          <StatCard 
            title="Highest Package" 
            value={placementStats.highestPackage} 
            icon={<Briefcase className="h-8 w-8 text-system-orange" />} 
          />
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="top-performers">Top Performers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Placement Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <OverviewItem label="Total Eligible Students" value={placementStats.totalEligible.toString()} />
                  <OverviewItem label="Total Placed" value={placementStats.totalPlaced.toString()} />
                  <OverviewItem label="Total Companies" value={placementStats.totalCompanies.toString()} />
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium mb-4">Placement History</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md border">
                    <p className="text-gray-500">Placement statistics chart will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="companies">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BuildingIcon className="mr-2 h-5 w-5" />
                  Recent Recruiting Companies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company Name</TableHead>
                      <TableHead>Visit Date</TableHead>
                      <TableHead>Students Placed</TableHead>
                      <TableHead>Average Package</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentCompanies.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell className="font-medium">{company.name}</TableCell>
                        <TableCell>{new Date(company.date).toLocaleDateString()}</TableCell>
                        <TableCell>{company.studentsPlaced}</TableCell>
                        <TableCell>{company.averagePackage}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="top-performers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Top Placement Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>CGPA</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topPerformers.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.company}</TableCell>
                        <TableCell>{student.package}</TableCell>
                        <TableCell>{student.cgpa}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}

function StatCard({ 
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

function OverviewItem({ 
  label, 
  value 
}: { 
  label: string; 
  value: string;
}) {
  return (
    <div className="bg-gray-50 p-4 rounded-md border">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}
