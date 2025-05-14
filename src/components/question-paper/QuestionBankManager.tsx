
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Search, Plus, FileText, Trash, Edit, Clock, Filter } from "lucide-react";
import { Question, QuestionBank, QuestionDifficulty, QuestionType } from "@/types/question";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample data
const sampleQuestionBanks: QuestionBank[] = [
  {
    id: "qb1",
    name: "Data Structures Basics",
    subject: "Computer Science",
    description: "Basic questions on arrays, linked lists, stacks, and queues",
    questions: [
      {
        id: "q1",
        text: "What is the time complexity of searching an element in a linked list?",
        subject: "Computer Science",
        topic: "Data Structures",
        difficulty: "Easy",
        type: "Multiple Choice",
        marks: 1,
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: "O(n)",
        createdAt: new Date(),
        createdBy: "admin",
      },
      {
        id: "q2",
        text: "Describe the difference between a stack and a queue.",
        subject: "Computer Science",
        topic: "Data Structures",
        difficulty: "Medium",
        type: "Short Answer",
        marks: 3,
        createdAt: new Date(),
        createdBy: "admin",
      },
    ],
    createdAt: new Date(),
    createdBy: "admin",
  },
  {
    id: "qb2",
    name: "Database Management",
    subject: "Information Technology",
    description: "Questions on SQL, normalization, and database design",
    questions: [
      {
        id: "q3",
        text: "What is the purpose of normalization in database design?",
        subject: "Information Technology",
        topic: "Database",
        difficulty: "Medium",
        type: "Long Answer",
        marks: 5,
        createdAt: new Date(),
        createdBy: "admin",
      },
    ],
    createdAt: new Date(),
    createdBy: "admin",
  },
];

// Schema for adding new question bank
const questionBankSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  subject: z.string().min(2, { message: "Subject is required" }),
  description: z.string().optional(),
});

// Schema for adding new question
const questionSchema = z.object({
  text: z.string().min(10, { message: "Question must be at least 10 characters" }),
  topic: z.string().min(2, { message: "Topic is required" }),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  type: z.enum(["Multiple Choice", "Short Answer", "Long Answer", "True/False"]),
  marks: z.number().min(1).max(20),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string().optional(),
});

export default function QuestionBankManager() {
  const { toast } = useToast();
  const [questionBanks, setQuestionBanks] = useState<QuestionBank[]>(sampleQuestionBanks);
  const [selectedBank, setSelectedBank] = useState<QuestionBank | null>(null);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const questionBankForm = useForm<z.infer<typeof questionBankSchema>>({
    resolver: zodResolver(questionBankSchema),
    defaultValues: {
      name: "",
      subject: "",
      description: "",
    },
  });

  const questionForm = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      text: "",
      topic: "",
      difficulty: "Medium",
      type: "Multiple Choice",
      marks: 1,
      options: ["", "", "", ""],
      correctAnswer: "",
    },
  });

  const handleAddQuestionBank = (values: z.infer<typeof questionBankSchema>) => {
    const newBank: QuestionBank = {
      id: `qb${questionBanks.length + 1}`,
      name: values.name,
      subject: values.subject,
      description: values.description || "",
      questions: [],
      createdAt: new Date(),
      createdBy: "admin",
    };
    
    setQuestionBanks([...questionBanks, newBank]);
    toast({
      title: "Question Bank Added",
      description: `${values.name} has been successfully created.`,
    });
    questionBankForm.reset();
  };

  const handleAddQuestion = (values: z.infer<typeof questionSchema>) => {
    if (!selectedBank) return;

    const newQuestion: Question = {
      id: `q${selectedBank.questions.length + 1}`,
      text: values.text,
      subject: selectedBank.subject,
      topic: values.topic,
      difficulty: values.difficulty as QuestionDifficulty,
      type: values.type as QuestionType,
      marks: values.marks,
      options: values.type === "Multiple Choice" ? values.options : undefined,
      correctAnswer: values.correctAnswer,
      createdAt: new Date(),
      createdBy: "admin",
    };

    const updatedBank = {
      ...selectedBank,
      questions: [...selectedBank.questions, newQuestion],
    };

    setQuestionBanks(
      questionBanks.map((bank) => (bank.id === selectedBank.id ? updatedBank : bank))
    );

    setSelectedBank(updatedBank);
    setIsAddingQuestion(false);
    toast({
      title: "Question Added",
      description: "Question has been successfully added to the bank.",
    });
    questionForm.reset();
  };

  const handleEditQuestion = (question: Question) => {
    setCurrentQuestion(question);
    questionForm.reset({
      text: question.text,
      topic: question.topic,
      difficulty: question.difficulty,
      type: question.type,
      marks: question.marks,
      options: question.options || ["", "", "", ""],
      correctAnswer: question.correctAnswer as string || "",
    });
    setIsAddingQuestion(true);
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (!selectedBank) return;

    const updatedBank = {
      ...selectedBank,
      questions: selectedBank.questions.filter((q) => q.id !== questionId),
    };

    setQuestionBanks(
      questionBanks.map((bank) => (bank.id === selectedBank.id ? updatedBank : bank))
    );

    setSelectedBank(updatedBank);
    toast({
      title: "Question Deleted",
      description: "Question has been removed from the bank.",
    });
  };

  const handleDeleteBank = (bankId: string) => {
    setQuestionBanks(questionBanks.filter((bank) => bank.id !== bankId));
    setSelectedBank(null);
    toast({
      title: "Question Bank Deleted",
      description: "Question bank has been removed.",
    });
  };

  // Filter questions based on search query
  const filteredQuestions = selectedBank?.questions.filter((q) =>
    q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Question Banks
            </CardTitle>
            <CardDescription>
              Create and manage question banks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {questionBanks.map((bank) => (
              <div
                key={bank.id}
                className={`p-4 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedBank?.id === bank.id ? "bg-blue-50 border-blue-300" : ""
                }`}
                onClick={() => setSelectedBank(bank)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{bank.name}</h3>
                    <p className="text-sm text-gray-500">{bank.subject}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {bank.questions.length} questions
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBank(bank.id);
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-gradient-primary">
                  <Plus className="mr-2 h-4 w-4" /> Add Question Bank
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Question Bank</DialogTitle>
                  <DialogDescription>
                    Create a new bank to organize your questions.
                  </DialogDescription>
                </DialogHeader>
                <Form {...questionBankForm}>
                  <form
                    onSubmit={questionBankForm.handleSubmit(handleAddQuestionBank)}
                    className="space-y-4"
                  >
                    <FormField
                      control={questionBankForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Database Management Questions" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={questionBankForm.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Computer Science" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={questionBankForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Brief description of this question bank"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit">Create Bank</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>

      <div className="md:col-span-2 space-y-6">
        {selectedBank ? (
          <>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{selectedBank.name}</CardTitle>
                    <CardDescription>{selectedBank.subject}</CardDescription>
                  </div>
                  <Button
                    onClick={() => setIsAddingQuestion(true)}
                    className="bg-gradient-primary"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Question
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search questions..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>

                <div className="border rounded-md overflow-hidden">
                  {filteredQuestions && filteredQuestions.length > 0 ? (
                    <div className="divide-y">
                      {filteredQuestions.map((question) => (
                        <div key={question.id} className="p-4 hover:bg-gray-50">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <Badge difficulty={question.difficulty} />
                                <Badge type={question.type} />
                                <span className="text-xs text-gray-500">
                                  {question.marks} {question.marks === 1 ? "mark" : "marks"}
                                </span>
                              </div>
                              <p className="font-medium">{question.text}</p>
                              <p className="text-sm text-gray-500 mt-1">
                                Topic: {question.topic}
                              </p>
                              {question.type === "Multiple Choice" && question.options && (
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                  {question.options.map((option, index) => (
                                    <div
                                      key={index}
                                      className={`text-xs p-1 rounded ${
                                        option === question.correctAnswer
                                          ? "bg-green-100 text-green-700"
                                          : "bg-gray-100"
                                      }`}
                                    >
                                      {option}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditQuestion(question)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteQuestion(question.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                        <FileText className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="font-medium text-gray-900">No questions found</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {selectedBank.questions.length === 0
                          ? "Start by adding questions to this bank"
                          : "Try changing your search query"}
                      </p>
                      {selectedBank.questions.length === 0 && (
                        <Button
                          className="mt-4"
                          onClick={() => setIsAddingQuestion(true)}
                        >
                          <Plus className="mr-2 h-4 w-4" /> Add First Question
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Dialog open={isAddingQuestion} onOpenChange={setIsAddingQuestion}>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>
                    {currentQuestion ? "Edit Question" : "Add New Question"}
                  </DialogTitle>
                  <DialogDescription>
                    {currentQuestion
                      ? "Modify the question details below"
                      : "Add a new question to the bank"}
                  </DialogDescription>
                </DialogHeader>
                <Form {...questionForm}>
                  <form
                    onSubmit={questionForm.handleSubmit(handleAddQuestion)}
                    className="space-y-4"
                  >
                    <FormField
                      control={questionForm.control}
                      name="text"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Question Text</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your question here"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={questionForm.control}
                        name="topic"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Topic</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Normalization" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={questionForm.control}
                        name="marks"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Marks</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                max="20"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={questionForm.control}
                        name="difficulty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Difficulty</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select difficulty" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Easy">Easy</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Hard">Hard</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={questionForm.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Question Type</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                // Reset options if question type changes
                                if (value !== "Multiple Choice") {
                                  questionForm.setValue("options", ["", "", "", ""]);
                                }
                              }}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Multiple Choice">
                                  Multiple Choice
                                </SelectItem>
                                <SelectItem value="Short Answer">Short Answer</SelectItem>
                                <SelectItem value="Long Answer">Long Answer</SelectItem>
                                <SelectItem value="True/False">True/False</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {questionForm.watch("type") === "Multiple Choice" && (
                      <FormField
                        control={questionForm.control}
                        name="options"
                        render={() => (
                          <FormItem>
                            <FormLabel>Options</FormLabel>
                            <div className="space-y-2">
                              {[0, 1, 2, 3].map((index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <Input
                                    placeholder={`Option ${index + 1}`}
                                    value={questionForm.watch("options")?.[index] || ""}
                                    onChange={(e) => {
                                      const newOptions = [
                                        ...(questionForm.watch("options") || []),
                                      ];
                                      newOptions[index] = e.target.value;
                                      questionForm.setValue("options", newOptions);
                                    }}
                                  />
                                  {questionForm.watch("options")?.[index] && (
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        questionForm.setValue(
                                          "correctAnswer",
                                          questionForm.watch("options")?.[index]
                                        );
                                      }}
                                      className={`${
                                        questionForm.watch("correctAnswer") ===
                                        questionForm.watch("options")?.[index]
                                          ? "bg-green-100 hover:bg-green-200"
                                          : ""
                                      }`}
                                    >
                                      Correct
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                            <FormDescription>
                              Mark the correct answer by clicking the "Correct" button
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    )}

                    {(questionForm.watch("type") === "Short Answer" ||
                      questionForm.watch("type") === "True/False") && (
                      <FormField
                        control={questionForm.control}
                        name="correctAnswer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Correct Answer</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter the correct answer"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsAddingQuestion(false);
                          setCurrentQuestion(null);
                          questionForm.reset();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        {currentQuestion ? "Update Question" : "Add Question"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <Card className="border-0 shadow-md h-full flex items-center justify-center">
            <CardContent className="p-8 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-medium text-xl text-gray-900">
                No Question Bank Selected
              </h3>
              <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
                Select an existing question bank or create a new one to get
                started.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-6 bg-gradient-primary">
                    <Plus className="mr-2 h-4 w-4" /> Create New Bank
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Question Bank</DialogTitle>
                    <DialogDescription>
                      Create a new bank to organize your questions.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...questionBankForm}>
                    <form
                      onSubmit={questionBankForm.handleSubmit(handleAddQuestionBank)}
                      className="space-y-4"
                    >
                      <FormField
                        control={questionBankForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Database Management Questions"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={questionBankForm.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Computer Science" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={questionBankForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Brief description of this question bank"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="submit">Create Bank</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

// Badge component for difficulty and question type
const Badge = ({
  difficulty,
  type,
}: {
  difficulty?: QuestionDifficulty;
  type?: QuestionType;
}) => {
  if (difficulty) {
    const colors = {
      Easy: "bg-green-100 text-green-800 border-green-200",
      Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Hard: "bg-red-100 text-red-800 border-red-200",
    };

    return (
      <span
        className={`text-xs px-2 py-1 rounded-full border ${colors[difficulty]}`}
      >
        {difficulty}
      </span>
    );
  }

  if (type) {
    const colors = {
      "Multiple Choice": "bg-purple-100 text-purple-800 border-purple-200",
      "Short Answer": "bg-blue-100 text-blue-800 border-blue-200",
      "Long Answer": "bg-indigo-100 text-indigo-800 border-indigo-200",
      "True/False": "bg-cyan-100 text-cyan-800 border-cyan-200",
    };

    return (
      <span
        className={`text-xs px-2 py-1 rounded-full border ${colors[type]}`}
      >
        {type}
      </span>
    );
  }

  return null;
};
