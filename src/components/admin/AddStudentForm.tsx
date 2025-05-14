
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Form schema
const studentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  admissionYear: z.string().regex(/^\d{4}$/, "Must be a valid year (4 digits)"),
  cgpa: z.string().regex(/^[0-4](\.\d{1,2})?$/, "CGPA must be between 0 and 4"),
  placementStatus: z.string(),
});

type StudentFormValues = z.infer<typeof studentSchema>;

interface AddStudentFormProps {
  open: boolean;
  onClose: () => void;
  onAddStudent: (student: StudentFormValues & { id: string }) => void;
}

export function AddStudentForm({ open, onClose, onAddStudent }: AddStudentFormProps) {
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      email: "",
      admissionYear: new Date().getFullYear().toString(),
      cgpa: "0.0",
      placementStatus: "Not Placed",
    },
  });

  function onSubmit(data: StudentFormValues) {
    // In a real app, you'd make an API call here
    const newStudent = {
      ...data,
      id: `student-${Date.now()}`, // Generate a unique ID
    };
    
    // Add the student to the list
    onAddStudent(newStudent);
    
    // Show success message
    toast({
      title: "Success",
      description: "Student added successfully!",
    });
    
    // Reset form and close dialog
    form.reset();
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Student Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="student@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="admissionYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admission Year</FormLabel>
                  <FormControl>
                    <Input placeholder="2023" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cgpa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CGPA</FormLabel>
                  <FormControl>
                    <Input placeholder="3.5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="placementStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placement Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Not Placed">Not Placed</SelectItem>
                      <SelectItem value="In Process">In Process</SelectItem>
                      <SelectItem value="Placed">Placed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add Student</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
