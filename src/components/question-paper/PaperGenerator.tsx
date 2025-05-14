
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { FileText, Settings, CheckCircle } from "lucide-react";
import { Question, QuestionBank, ExamPattern, QuestionType, GeneratedPaper } from "@/types/question";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Sample data
import { sampleQuestionBanks, sampleExamPatterns } from "@/data/sampleData";

const generatorSchema = z.object({
  name: z.string().min(3, { message: "Paper name is required" }),
  subject: z.string().min(2, { message: "Subject is required" }),
  questionBankId: z.string().min(1, { message: "Please select a question bank" }),
  patternId: z.string().min(1, { message: "Please select an exam pattern" }),
});

export default function PaperGenerator() {
  const { toast } = useToast();
  const [questionBanks] = useState<QuestionBank[]>(sampleQuestionBanks);
  const [examPatterns] = useState<ExamPattern[]>(sampleExamPatterns);
  const [selectedBank, setSelectedBank] = useState<QuestionBank | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<ExamPattern | null>(null);
  const [generatedPaper, setGeneratedPaper] = useState<GeneratedPaper | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedPapers, setSavedPapers] = useState<GeneratedPaper[]>([]); 

  const form = useForm<z.infer<typeof generatorSchema>>({
    resolver: zodResolver(generatorSchema),
    defaultValues: {
      name: "",
      subject: "",
      questionBankId: "",
      patternId: "",
    },
  });

  const watchBankId = form.watch("questionBankId");
  const watchPatternId = form.watch("patternId");

  // Update selected bank and pattern when their IDs change
  React.useEffect(() => {
    if (watchBankId) {
      const bank = questionBanks.find(bank => bank.id === watchBankId);
      setSelectedBank(bank || null);
      
      // Auto-fill subject if bank is selected
      if (bank) {
        form.setValue("subject", bank.subject);
      }
    }
  }, [watchBankId, questionBanks, form]);

  React.useEffect(() => {
    if (watchPatternId) {
      const pattern = examPatterns.find(pattern => pattern.id === watchPatternId);
      setSelectedPattern(pattern || null);
    }
  }, [watchPatternId, examPatterns]);

  const generateQuestionPaper = (values: z.infer<typeof generatorSchema>) => {
    if (!selectedBank || !selectedPattern) return;
    
    setIsGenerating(true);
    
    // Simulate generation delay
    setTimeout(() => {
      try {
        // Generate question paper based on pattern and bank
        const paper = generatePaper(
          values.name,
          values.subject,
          selectedBank,
          selectedPattern
        );
        
        setGeneratedPaper(paper);
        toast({
          title: "Paper Generated",
          description: "Your question paper has been successfully generated.",
        });
      } catch (error) {
        toast({
          title: "Generation Failed",
          description: error instanceof Error ? error.message : "Failed to generate question paper",
          variant: "destructive",
        });
      } finally {
        setIsGenerating(false);
      }
    }, 1500);
  };

  // Function to generate question paper
  const generatePaper = (
    name: string,
    subject: string,
    bank: QuestionBank,
    pattern: ExamPattern
  ): GeneratedPaper => {
    // Filter questions by subject
    const availableQuestions = bank.questions.filter(q => q.subject === subject);
    
    if (availableQuestions.length === 0) {
      throw new Error(`No questions available for subject: ${subject}`);
    }

    let selectedQuestions: Question[] = [];
    
    // Process each section in the pattern
    pattern.sections.forEach(section => {
      const sectionQuestions: Question[] = [];
      
      // Filter by question types for this section
      const questionsForTypes = availableQuestions.filter(q => 
        section.questionTypes.includes(q.type as QuestionType)
      );
      
      // Group by difficulty
      const easyQuestions = questionsForTypes.filter(q => q.difficulty === "Easy");
      const mediumQuestions = questionsForTypes.filter(q => q.difficulty === "Medium");
      const hardQuestions = questionsForTypes.filter(q => q.difficulty === "Hard");
      
      // Calculate question counts by difficulty
      const easyCount = Math.round(section.questionCount * (section.difficultyDistribution.easy / 100));
      const mediumCount = Math.round(section.questionCount * (section.difficultyDistribution.medium / 100));
      const hardCount = section.questionCount - easyCount - mediumCount;
      
      // Randomly select questions for each difficulty
      const getRandomQuestions = (questions: Question[], count: number) => {
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      };
      
      // Check if we have enough questions
      if (
        easyQuestions.length < easyCount || 
        mediumQuestions.length < mediumCount || 
        hardQuestions.length < hardCount
      ) {
        throw new Error(`Not enough questions available for section: ${section.name}`);
      }
      
      // Get questions for each difficulty level
      sectionQuestions.push(...getRandomQuestions(easyQuestions, easyCount));
      sectionQuestions.push(...getRandomQuestions(mediumQuestions, mediumCount));
      sectionQuestions.push(...getRandomQuestions(hardQuestions, hardCount));
      
      // Add section questions to overall selected questions
      selectedQuestions.push(...sectionQuestions);
    });
    
    // Create the paper object
    return {
      id: `paper-${Date.now()}`,
      name,
      totalMarks: pattern.totalMarks,
      duration: pattern.duration,
      subject,
      pattern,
      questions: selectedQuestions,
      createdAt: new Date(),
      createdBy: "admin",
    };
  };

  const handleSavePaper = () => {
    if (generatedPaper) {
      setSavedPapers((prev) => [...prev, generatedPaper]);
      toast({
        title: "Paper Saved",
        description: `"${generatedPaper.name}" has been saved successfully.`,
      });
    }
  };

  const handleEditPaper = () => {
    toast({
      title: "Edit Paper",
      description: "Paper editing functionality will be available in the next update.",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Generate Question Paper
            </CardTitle>
            <CardDescription>
              Configure and generate a new question paper
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(generateQuestionPaper)} 
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Paper Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Mid-Term Examination 2025" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Computer Science" {...field} />
                      </FormControl>
                      <FormDescription>
                        This will be auto-filled when you select a question bank
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="questionBankId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Bank</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a question bank" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {questionBanks.map((bank) => (
                            <SelectItem key={bank.id} value={bank.id}>
                              {bank.name} ({bank.questions.length} questions)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="patternId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exam Pattern</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an exam pattern" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {examPatterns.map((pattern) => (
                            <SelectItem key={pattern.id} value={pattern.id}>
                              {pattern.name} ({pattern.totalMarks} marks, {pattern.duration} min)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedPattern && (
                  <div className="p-4 bg-blue-50 rounded-md">
                    <h4 className="font-medium text-blue-800 mb-2">Pattern Preview</h4>
                    {selectedPattern.sections.map((section, idx) => (
                      <div key={idx} className="text-sm mb-2">
                        <div className="font-medium text-blue-700">{section.name}</div>
                        <ul className="list-disc pl-5 text-blue-600 text-xs">
                          <li>Questions: {section.questionCount}</li>
                          <li>
                            Distribution: {section.difficultyDistribution.easy}% Easy, 
                            {section.difficultyDistribution.medium}% Medium, 
                            {section.difficultyDistribution.hard}% Hard
                          </li>
                          <li>Marks per Question: {section.marksPerQuestion}</li>
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary" 
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>Generating Paper...</>
                  ) : (
                    <>Generate Question Paper</>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      
      <div>
        {generatedPaper ? (
          <Card className="border-0 shadow-md">
            <CardHeader className="bg-gradient-secondary text-white">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  <span>{generatedPaper.name}</span>
                </div>
                <span className="text-sm font-normal">
                  {generatedPaper.totalMarks} marks
                </span>
              </CardTitle>
              <CardDescription className="text-white/80">
                {generatedPaper.subject} • {generatedPaper.duration} minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Alert className="mb-4 bg-green-50 border-green-100">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertTitle>Paper Generated Successfully</AlertTitle>
                <AlertDescription>
                  Your question paper has been created with {generatedPaper.questions.length} questions.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-6">
                {generatedPaper.pattern.sections.map((section, sectionIdx) => {
                  // Filter questions for this section based on type and count
                  const sectionQuestions = generatedPaper.questions.filter(
                    (q) => section.questionTypes.includes(q.type as QuestionType)
                  ).slice(0, section.questionCount);
                  
                  return (
                    <div key={sectionIdx} className="border rounded-md p-4">
                      <h3 className="font-medium text-lg mb-3">
                        Section {sectionIdx + 1}: {section.name}
                      </h3>
                      <div className="space-y-3">
                        {sectionQuestions.map((question, qIdx) => (
                          <div 
                            key={question.id} 
                            className="p-3 bg-gray-50 rounded-md"
                          >
                            <div className="flex justify-between">
                              <span className="font-medium">
                                Q{sectionIdx + 1}.{qIdx + 1}
                              </span>
                              <span className="text-sm text-gray-500">
                                {question.marks} marks • {question.difficulty}
                              </span>
                            </div>
                            <p className="mt-1">{question.text}</p>
                            
                            {question.type === "Multiple Choice" && question.options && (
                              <div className="grid grid-cols-2 gap-2 mt-2">
                                {question.options.map((option, idx) => (
                                  <div 
                                    key={idx} 
                                    className="text-sm p-1 bg-white border rounded-md"
                                  >
                                    {String.fromCharCode(97 + idx)}. {option}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter className="justify-end space-x-2">
              <Button variant="outline" onClick={handleEditPaper}>
                Edit Paper
              </Button>
              <Button variant="default" onClick={handleSavePaper}>
                Save Paper
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="border-0 shadow-md h-full flex items-center justify-center">
            <CardContent className="p-8 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-medium text-xl text-gray-900">
                No Paper Generated Yet
              </h3>
              <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
                Configure the options on the left and click "Generate Question Paper" 
                to create a new exam paper.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
