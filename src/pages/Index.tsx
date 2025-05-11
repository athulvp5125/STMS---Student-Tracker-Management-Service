
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, Briefcase, FileText, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Student <span className="gradient-text">Tracking</span> & <span className="gradient-text">Management</span> System
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                A comprehensive platform for managing student academics, placements, and examinations with seamless tracking and reporting.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => navigate('/login')} 
                  className="bg-gradient-primary hover:opacity-90 text-white px-8 py-6 text-lg"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  onClick={() => navigate('/register')} 
                  variant="outline" 
                  className="border-2 border-primary text-primary hover:bg-primary/5 px-8 py-6 text-lg"
                >
                  Register Account
                </Button>
              </div>
            </div>
            <div className="flex-1 hidden md:block">
              <img 
                src="/placeholder.svg" 
                alt="Student Management" 
                className="object-cover w-full h-auto rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Key Features</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Our comprehensive solution for educational institutions offers powerful tools to streamline student management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Users className="h-12 w-12 text-system-blue" />}
              title="Student Management"
              description="Efficiently manage student profiles, attendance, and personal information."
              color="bg-blue-50"
            />
            <FeatureCard 
              icon={<GraduationCap className="h-12 w-12 text-system-purple" />}
              title="Academic Records"
              description="Track academic performance, grades, and curriculum progress."
              color="bg-purple-50"
            />
            <FeatureCard 
              icon={<Briefcase className="h-12 w-12 text-system-orange" />}
              title="Placements"
              description="Manage campus placements, company visits, and student job offers."
              color="bg-orange-50"
            />
            <FeatureCard 
              icon={<FileText className="h-12 w-12 text-system-green" />}
              title="Exam Management"
              description="Create and manage examinations, generate reports, and analyze performance."
              color="bg-green-50"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 lg:px-24 bg-gray-100 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600">© 2025 Student Tracking & Management System</p>
            <div className="flex gap-8">
              <a href="#" className="text-gray-600 hover:text-primary">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-primary">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-primary">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, color }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  color: string;
}) => {
  return (
    <div className={`${color} p-6 rounded-xl border border-gray-100 card-hover`}>
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Index;
