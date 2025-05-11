
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentsManagement from "./pages/admin/StudentsManagement";
import PlacementManagement from "./pages/admin/PlacementManagement";
import AcademicRecords from "./pages/admin/AcademicRecords";
import TrainingModule from "./pages/admin/TrainingModule";
import ExamManagement from "./pages/admin/ExamManagement";
import Settings from "./pages/admin/Settings";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import Academics from "./pages/student/Academics";
import Placements from "./pages/student/Placements";
import Training from "./pages/student/Training";
import Exams from "./pages/student/Exams";

// 404 Page
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Admin Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/students" element={<StudentsManagement />} />
              <Route path="/admin/placements" element={<PlacementManagement />} />
              <Route path="/admin/academics" element={<AcademicRecords />} />
              <Route path="/admin/training" element={<TrainingModule />} />
              <Route path="/admin/exams" element={<ExamManagement />} />
              <Route path="/admin/settings" element={<Settings />} />
            </Route>
            
            {/* Student Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={['student', 'faculty', 'placement_officer']} />}>
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/academics" element={<Academics />} />
              <Route path="/student/placements" element={<Placements />} />
              <Route path="/student/training" element={<Training />} />
              <Route path="/student/exams" element={<Exams />} />
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
