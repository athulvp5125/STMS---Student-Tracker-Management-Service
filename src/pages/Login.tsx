
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(email, password, isAdmin);
      
      // Redirect based on admin checkbox
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Error is handled in the login function
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Student Tracking & Management</CardTitle>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="your.email@example.com or 'admin'"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="isAdmin" 
                checked={isAdmin}
                onCheckedChange={(checked) => setIsAdmin(checked === true)}
              />
              <Label htmlFor="isAdmin" className="text-sm cursor-pointer">
                Login as Administrator
              </Label>
            </div>
          </CardContent>
          
          <CardFooter className="flex-col gap-3">
            <Button 
              type="submit" 
              className="w-full bg-system-blue hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
            
            <p className="text-center text-sm text-gray-600 mt-2">
              Use admin/1234 for admin access
            </p>
            
            <p className="text-sm text-gray-500 text-center">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={navigateToRegister}
                className="text-system-blue hover:underline"
              >
                Register here
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
