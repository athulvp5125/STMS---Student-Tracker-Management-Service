
export type QuestionDifficulty = "Easy" | "Medium" | "Hard";
export type QuestionType = "Multiple Choice" | "Short Answer" | "Long Answer" | "True/False";

export interface Question {
  id: string;
  text: string;
  subject: string;
  topic: string;
  difficulty: QuestionDifficulty;
  type: QuestionType;
  marks: number;
  options?: string[];
  correctAnswer?: string | string[];
  createdAt: Date;
  createdBy: string;
}

export interface QuestionBank {
  id: string;
  name: string;
  subject: string;
  description: string;
  questions: Question[];
  createdAt: Date;
  createdBy: string;
}

export interface ExamPattern {
  id: string;
  name: string;
  totalMarks: number;
  duration: number; // In minutes
  sections: ExamSection[];
}

export interface ExamSection {
  name: string;
  questionTypes: QuestionType[];
  questionCount: number;
  difficultyDistribution: {
    easy: number; // Percentage
    medium: number; // Percentage
    hard: number; // Percentage
  };
  marksPerQuestion: number;
}

export interface GeneratedPaper {
  id: string;
  name: string;
  totalMarks: number;
  duration: number;
  subject: string;
  pattern: ExamPattern;
  questions: Question[];
  createdAt: Date;
  createdBy: string;
}
