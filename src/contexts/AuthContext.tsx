
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
export interface AppUser extends Omit<User, 'displayName'> {
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
  login: (email: string, password: string, isAdminLogin: boolean) => Promise<void>;
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
      
      // Create user profile document in Firestore with plaintext name
      await setDoc(doc(db, "users", user.uid), {
        email,
        role,
        name, // Store the name in plain text
        createdAt: new Date().toISOString()
      });
      
      // Also create a student record for student roles
      if (role === 'student') {
        await setDoc(doc(db, "students", user.uid), {
          name: name, // Store student name in plain text
          email: email,
          userId: user.uid,
          admissionYear: new Date().getFullYear().toString(),
          cgpa: "0.0",
          placementStatus: "Not Placed",
          createdAt: new Date().toISOString()
        });
      }
      
      toast.success("Registration successful!");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Failed to register");
      throw error;
    }
  }

  // Login user
  async function login(email: string, password: string, isAdminLogin: boolean) {
    try {
      // Special case for admin credentials
      if (email === "admin" && password === "1234") {
        // Create a mock admin user
        const mockAdminUser = {
          uid: "admin-special",
          email: "admin@example.com",
          displayName: "Administrator",
          role: "admin" as UserRole,
          // Add other required User properties
          emailVerified: true,
          isAnonymous: false,
          metadata: {},
          providerData: [],
          refreshToken: "",
          tenantId: null,
          delete: async () => {},
          getIdToken: async () => "",
          getIdTokenResult: async () => ({ claims: {}, token: "", authTime: "", issuedAtTime: "", expirationTime: "", signInProvider: null, signInSecondFactor: null }),
          reload: async () => {},
          toJSON: () => ({})
        } as unknown as AppUser;
        
        setCurrentUser(mockAdminUser);
        setUserRole("admin");
        toast.success("Admin login successful!");
        return;
      }
      
      // Regular Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Check if user is trying to access the admin area but doesn't have admin role
        if (isAdminLogin && userData.role !== 'admin') {
          await signOut(auth);
          toast.error("You don't have admin privileges");
          throw new Error("Unauthorized access");
        }
        
        // Set user information
        const appUser = user as AppUser;
        appUser.role = userData.role as UserRole;
        appUser.displayName = userData.name;
        
        setCurrentUser(appUser);
        setUserRole(userData.role as UserRole);
        
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
            appUser.displayName = userData.name; // Use the plaintext name from Firestore
            
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
