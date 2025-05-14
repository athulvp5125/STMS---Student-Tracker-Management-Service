
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { 
  Plus, 
  Trash, 
  Edit, 
  Settings, 
  Clock,
  FileText, 
  ChevronUp, 
  ChevronDown,
  Search 
} from "lucide-react";
import { 
  ExamPattern, 
  ExamSection,
  QuestionType 
} from "@/types/question";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Sample data
import { sampleExamPatterns } from "@/data/sampleData";

// Schema for exam pattern
const patternSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  totalMarks: z.number().min(10, { message: "Total marks must be at least 10" }),
  duration: z.number().min(15, { message: "Duration must be at least 15 minutes" }),
});

// Schema for exam section
const sectionSchema = z.object({
  name: z.string().min(2, { message: "Section name is required" }),
  questionTypes: z.array(z.enum(["Multiple Choice", "Short Answer", "Long Answer", "True/False"]))
    .min(1, { message: "At least one question type is required" }),
  questionCount: z.number().min(1, { message: "Question count must be at least 1" }),
  difficultyEasy: z.number().min(0).max(100),
  difficultyMedium: z.number().min(0).max(100),
  difficultyHard: z.number().min(0).max(100),
  marksPerQuestion: z.number().min(1, { message: "Marks per question must be at least 1" }),
});

export default function ExamPatterns() {
  const { toast } = useToast();
  const [patterns, setPatterns] = useState<ExamPattern[]>(sampleExamPatterns);
  const [showAddPattern, setShowAddPattern] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [editingPattern, setEditingPattern] = useState<ExamPattern | null>(null);
  const [currentSections, setCurrentSections] = useState<ExamSection[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<QuestionType[]>([]);

  const patternForm = useForm<z.infer<typeof patternSchema>>({
    resolver: zodResolver(patternSchema),
    defaultValues: {
      name: "",
      totalMarks: 100,
      duration: 180,
    },
  });

  const sectionForm = useForm<z.infer<typeof sectionSchema>>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      name: "",
      questionTypes: [],
      questionCount: 5,
      difficultyEasy: 30,
      difficultyMedium: 50,
      difficultyHard: 20,
      marksPerQuestion: 2,
    },
  });

  const resetPatternForm = () => {
    patternForm.reset({
      name: "",
      totalMarks: 100,
      duration: 180,
    });
    setCurrentSections([]);
    setEditingPattern(null);
  };

  const resetSectionForm = () => {
    sectionForm.reset({
      name: "",
      questionTypes: [],
      questionCount: 5,
      difficultyEasy: 30,
      difficultyMedium: 50,
      difficultyHard: 20,
      marksPerQuestion: 2,
    });
    setSelectedTypes([]);
  };

  const handleAddPattern = (values: z.infer<typeof patternSchema>) => {
    if (currentSections.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one section to the exam pattern",
        variant: "destructive",
      });
      return;
    }

    // Calculate the total marks from all sections
    const calculatedTotalMarks = currentSections.reduce((total, section) => {
      return total + section.questionCount * section.marksPerQuestion;
    }, 0);

    // Warn if there's a mismatch, but allow creation
    if (calculatedTotalMarks !== values.totalMarks) {
      toast({
        title: "Warning",
        description: `Total marks from sections (${calculatedTotalMarks}) doesn't match the specified total (${values.totalMarks})`,
      });
    }

    if (editingPattern) {
      // Update existing pattern
      const updatedPattern: ExamPattern = {
        ...editingPattern,
        name: values.name,
        totalMarks: values.totalMarks,
        duration: values.duration,
        sections: currentSections,
      };

      setPatterns(patterns.map(p => p.id === editingPattern.id ? updatedPattern : p));
      toast({
        title: "Pattern Updated",
        description: `${values.name} has been successfully updated.`,
      });
    } else {
      // Add new pattern
      const newPattern: ExamPattern = {
        id: `pattern-${Date.now()}`,
        name: values.name,
        totalMarks: values.totalMarks,
        duration: values.duration,
        sections: currentSections,
      };
      
      setPatterns([...patterns, newPattern]);
      toast({
        title: "Pattern Added",
        description: `${values.name} has been successfully created.`,
      });
    }

    resetPatternForm();
    setShowAddPattern(false);
  };

  const handleAddSection = (values: z.infer<typeof sectionSchema>) => {
    // Check that percentages add up to 100
    const totalPercentage = values.difficultyEasy + values.difficultyMedium + values.difficultyHard;
    
    if (totalPercentage !== 100) {
      toast({
        title: "Error",
        description: "Difficulty percentages must add up to 100%",
        variant: "destructive",
      });
      return;
    }

    const newSection: ExamSection = {
      name: values.name,
      questionTypes: values.questionTypes as QuestionType[],
      questionCount: values.questionCount,
      difficultyDistribution: {
        easy: values.difficultyEasy,
        medium: values.difficultyMedium,
        hard: values.difficultyHard,
      },
      marksPerQuestion: values.marksPerQuestion,
    };

    setCurrentSections([...currentSections, newSection]);
    resetSectionForm();
    setShowAddSection(false);
    
    toast({
      title: "Section Added",
      description: `${values.name} has been added to the pattern.`,
    });
  };

  const handleDeletePattern = (patternId: string) => {
    setPatterns(patterns.filter((pattern) => pattern.id !== patternId));
    toast({
      title: "Pattern Deleted",
      description: "The exam pattern has been removed.",
    });
  };

  const handleEditPattern = (pattern: ExamPattern) => {
    setEditingPattern(pattern);
    patternForm.reset({
      name: pattern.name,
      totalMarks: pattern.totalMarks,
      duration: pattern.duration,
    });
    setCurrentSections([...pattern.sections]);
    setShowAddPattern(true);
  };

  const handleDeleteSection = (index: number) => {
    const newSections = [...currentSections];
    newSections.splice(index, 1);
    setCurrentSections(newSections);
  };

  // Handle question type selection
  const toggleQuestionType = (type: QuestionType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
      sectionForm.setValue(
        "questionTypes", 
        sectionForm.getValues("questionTypes").filter(t => t !== type)
      );
    } else {
      setSelectedTypes([...selectedTypes, type]);
      sectionForm.setValue(
        "questionTypes", 
        [...sectionForm.getValues("questionTypes"), type]
      );
    }
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === currentSections.length - 1)
    ) {
      return;
    }

    const newSections = [...currentSections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    
    setCurrentSections(newSections);
  };

  // Filter patterns based on search
  const filteredPatterns = patterns.filter(pattern => 
    pattern.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search exam patterns..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button 
          onClick={() => {
            resetPatternForm();
            setShowAddPattern(true);
          }}
          className="bg-gradient-primary"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Pattern
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatterns.length > 0 ? (
          filteredPatterns.map((pattern) => (
            <Card key={pattern.id} className="border-0 shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-secondary text-white">
                <CardTitle className="flex justify-between items-center">
                  <span>{pattern.name}</span>
                  <div className="text-sm font-normal">
                    {pattern.totalMarks} marks
                  </div>
                </CardTitle>
                <CardDescription className="text-white/80 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {pattern.duration} minutes
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {pattern.sections.map((section, index) => (
                    <AccordionItem key={index} value={`section-${index}`}>
                      <AccordionTrigger className="hover:bg-gray-50 px-3">
                        <div className="flex justify-between w-full pr-4">
                          <span>{section.name}</span>
                          <span className="text-gray-500 text-sm">
                            {section.questionCount} questions
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="bg-gray-50 px-3 py-2">
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Question Types:</span>
                            <span>{section.questionTypes.join(", ")}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">Marks per Question:</span>
                            <span>{section.marksPerQuestion}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">Difficulty:</span>
                            <span>
                              {section.difficultyDistribution.easy}% Easy, 
                              {section.difficultyDistribution.medium}% Medium, 
                              {section.difficultyDistribution.hard}% Hard
                            </span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Section Marks:</span>
                            <span>
                              {section.questionCount * section.marksPerQuestion} marks
                            </span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
              
              <CardFooter className="justify-end space-x-2 p-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDeletePattern(pattern.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditPattern(pattern)}
                >
                  <Edit className="h-4 w-4 mr-1" /> 
                  Edit
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center p-8 border rounded-md">
            <div className="text-center">
              <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <h3 className="text-lg font-medium">No patterns found</h3>
              <p className="text-sm text-gray-500">
                {patterns.length === 0 
                  ? "Start by creating a new exam pattern"
                  : "No results match your search"}
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Add/Edit Pattern Dialog */}
      <Dialog open={showAddPattern} onOpenChange={setShowAddPattern}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {editingPattern ? "Edit Exam Pattern" : "Create New Exam Pattern"}
            </DialogTitle>
            <DialogDescription>
              Define the pattern settings and add sections
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pattern Form */}
            <div className="md:col-span-1">
              <Form {...patternForm}>
                <form className="space-y-4">
                  <FormField
                    control={patternForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pattern Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Standard Midterm" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={patternForm.control}
                    name="totalMarks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Marks</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="10"
                            placeholder="e.g., 100" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={patternForm.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (minutes)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="15"
                            placeholder="e.g., 180" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="button"
                    onClick={() => setShowAddSection(true)}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Section
                  </Button>
                </form>
              </Form>
            </div>
            
            {/* Sections List */}
            <div className="md:col-span-2 border rounded-md p-4">
              <h3 className="font-medium mb-4">Sections</h3>
              {currentSections.length === 0 ? (
                <div className="text-center py-8">
                  <Settings className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">No sections added yet</p>
                  <Button
                    className="mt-4"
                    variant="outline"
                    onClick={() => setShowAddSection(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Section
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {currentSections.map((section, index) => (
                    <div 
                      key={index} 
                      className="border rounded-md p-3 bg-gray-50"
                    >
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">
                            {section.name}
                          </h4>
                          <div className="text-sm text-gray-600">
                            {section.questionCount} questions • 
                            {section.marksPerQuestion} marks each
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Types: {section.questionTypes.join(", ")}
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <div className="flex flex-col">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveSection(index, 'up')}
                              disabled={index === 0}
                              className="h-6 w-6 p-0"
                            >
                              <ChevronUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveSection(index, 'down')}
                              disabled={index === currentSections.length - 1}
                              className="h-6 w-6 p-0"
                            >
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteSection(index)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-3 flex justify-between items-center">
                    <div>
                      <span className="text-sm font-medium">
                        Total Questions: {currentSections.reduce((sum, s) => sum + s.questionCount, 0)}
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm font-medium">
                        Calculated Marks: {currentSections.reduce((sum, s) => sum + s.questionCount * s.marksPerQuestion, 0)}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAddSection(true)}
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      Add Section
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                resetPatternForm();
                setShowAddPattern(false);
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={patternForm.handleSubmit(handleAddPattern)}
              disabled={currentSections.length === 0}
            >
              {editingPattern ? "Update Pattern" : "Create Pattern"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Section Dialog */}
      <Dialog open={showAddSection} onOpenChange={setShowAddSection}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Section</DialogTitle>
            <DialogDescription>
              Define the settings for this exam section
            </DialogDescription>
          </DialogHeader>
          
          <Form {...sectionForm}>
            <form onSubmit={sectionForm.handleSubmit(handleAddSection)} className="space-y-4">
              <FormField
                control={sectionForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Multiple Choice Section" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={sectionForm.control}
                name="questionTypes"
                render={() => (
                  <FormItem>
                    <FormLabel>Question Types</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {(["Multiple Choice", "Short Answer", "Long Answer", "True/False"] as QuestionType[]).map((type) => (
                        <Button
                          key={type}
                          type="button"
                          variant="outline"
                          size="sm"
                          className={`${
                            selectedTypes.includes(type) 
                              ? "bg-blue-100 border-blue-300 text-blue-800" 
                              : ""
                          }`}
                          onClick={() => toggleQuestionType(type)}
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={sectionForm.control}
                  name="questionCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Count</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={sectionForm.control}
                  name="marksPerQuestion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marks Per Question</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div>
                <Label>Difficulty Distribution (Total: 100%)</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center gap-4">
                    <div className="w-16 text-sm">Easy:</div>
                    <div className="flex-1">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={sectionForm.watch("difficultyEasy")}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          sectionForm.setValue("difficultyEasy", val);
                        }}
                      />
                    </div>
                    <div className="w-8 text-sm">%</div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-16 text-sm">Medium:</div>
                    <div className="flex-1">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={sectionForm.watch("difficultyMedium")}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          sectionForm.setValue("difficultyMedium", val);
                        }}
                      />
                    </div>
                    <div className="w-8 text-sm">%</div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-16 text-sm">Hard:</div>
                    <div className="flex-1">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={sectionForm.watch("difficultyHard")}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          sectionForm.setValue("difficultyHard", val);
                        }}
                      />
                    </div>
                    <div className="w-8 text-sm">%</div>
                  </div>
                </div>
                
                <div className="text-sm mt-2 flex justify-between">
                  <span>Total:</span>
                  <span className={`font-medium ${
                    sectionForm.watch("difficultyEasy") + 
                    sectionForm.watch("difficultyMedium") + 
                    sectionForm.watch("difficultyHard") !== 100
                      ? "text-red-500"
                      : "text-green-500"
                  }`}>
                    {sectionForm.watch("difficultyEasy") + 
                     sectionForm.watch("difficultyMedium") + 
                     sectionForm.watch("difficultyHard")}%
                  </span>
                </div>
              </div>
              
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetSectionForm();
                    setShowAddSection(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Section</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
