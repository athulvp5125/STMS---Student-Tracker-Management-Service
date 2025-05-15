
import { QuestionBank, ExamPattern } from "@/types/question";

// Sample data for question banks
export const sampleQuestionBanks: QuestionBank[] = [
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
      }
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
        id: "q6",
        text: "What is the purpose of normalization in database design?",
        subject: "Information Technology",
        topic: "Database",
        difficulty: "Medium",
        type: "Long Answer",
        marks: 5,
        createdAt: new Date(),
        createdBy: "admin",
      },
      {
        id: "q7",
        text: "Which normal form eliminates transitive dependencies?",
        subject: "Information Technology",
        topic: "Database",
        difficulty: "Medium",
        type: "Multiple Choice",
        marks: 2,
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correctAnswer: "3NF",
        createdAt: new Date(),
        createdBy: "admin",
      }
    ],
    createdAt: new Date(),
    createdBy: "admin",
  }
];

// Sample data for exam patterns
export const sampleExamPatterns: ExamPattern[] = [
  {
    id: "pattern-1",
    name: "Standard Mid-Term",
    totalMarks: 50,
    duration: 120, // 2 hours in minutes
    sections: [
      {
        name: "Multiple Choice Questions",
        questionTypes: ["Multiple Choice"],
        questionCount: 15,
        difficultyDistribution: {
          easy: 40,
          medium: 40,
          hard: 20,
        },
        marksPerQuestion: 1,
      },
      {
        name: "Short Answer Questions",
        questionTypes: ["Short Answer"],
        questionCount: 5,
        difficultyDistribution: {
          easy: 30,
          medium: 50,
          hard: 20,
        },
        marksPerQuestion: 3,
      },
      {
        name: "Long Answer Questions",
        questionTypes: ["Long Answer"],
        questionCount: 2,
        difficultyDistribution: {
          easy: 0,
          medium: 50,
          hard: 50,
        },
        marksPerQuestion: 10,
      },
    ],
  },
  {
    id: "pattern-2",
    name: "Quick Quiz",
    totalMarks: 25,
    duration: 30, // 30 minutes
    sections: [
      {
        name: "Multiple Choice Questions",
        questionTypes: ["Multiple Choice"],
        questionCount: 15,
        difficultyDistribution: {
          easy: 40,
          medium: 40,
          hard: 20,
        },
        marksPerQuestion: 1,
      },
      {
        name: "True/False Questions",
        questionTypes: ["True/False"],
        questionCount: 10,
        difficultyDistribution: {
          easy: 50,
          medium: 50,
          hard: 0,
        },
        marksPerQuestion: 1,
      },
    ],
  }
];
