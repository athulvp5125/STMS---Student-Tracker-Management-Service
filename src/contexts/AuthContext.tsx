
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { 
  User,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { toast } from "sonner";

// Define user roles
export type UserRole = 'admin' | 'faculty' | 'placement_officer' | 'student';

// Extend Firebase User type with our custom properties
export interface AppUser extends User {
  role?: UserRole;
  displayName?: string;
}

interface AuthContextType {
  currentUser: AppUser | null;
  userRole: UserRole | null;
  isAdmin: boolean;
  isFaculty: boolean;
  isPlacementOfficer: boolean;
  isStudent: boolean;
  loading: boolean;
  register: (email: string, password: string, role: UserRole, name: string) => Promise<void>;
  login: (email: string, password: string, isAdmin: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  // Register new user
  async function register(email: string, password: string, role: UserRole, name: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create user profile document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        role,
        name,
        createdAt: new Date().toISOString()
      });
      
      toast.success("Registration successful!");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Failed to register");
      throw error;
    }
  }

  // Login user
  async function login(email: string, password: string, isAdmin: boolean) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Check if user is trying to access the admin area but doesn't have admin role
        if (isAdmin && userData.role !== 'admin') {
          await signOut(auth);
          toast.error("You don't have admin privileges");
          throw new Error("Unauthorized access");
        }
        
        // Check if regular student is trying to access student portal
        if (!isAdmin && userData.role === 'admin') {
          toast.info("Redirecting to admin dashboard");
        }
        
        toast.success("Login successful!");
      } else {
        // No user document found
        toast.error("User profile not found");
        await signOut(auth);
        throw new Error("User profile not found");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Failed to login");
      throw error;
    }
  }

  // Logout user
  async function logout() {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error(error.message || "Failed to logout");
      throw error;
    }
  }

  // Set up auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const appUser = user as AppUser;
            appUser.role = userData.role as UserRole;
            appUser.displayName = userData.name;
            
            setCurrentUser(appUser);
            setUserRole(userData.role as UserRole);
          } else {
            setCurrentUser(user as AppUser);
            setUserRole(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setCurrentUser(user as AppUser);
          setUserRole(null);
        }
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const isAdmin = userRole === 'admin';
  const isFaculty = userRole === 'faculty';
  const isPlacementOfficer = userRole === 'placement_officer';
  const isStudent = userRole === 'student';

  const value = {
    currentUser,
    userRole,
    isAdmin,
    isFaculty,
    isPlacementOfficer,
    isStudent,
    loading,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
