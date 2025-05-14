
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionBankManager from "@/components/question-paper/QuestionBankManager";
import PaperGenerator from "@/components/question-paper/PaperGenerator";
import ExamPatterns from "@/components/question-paper/ExamPatterns";
import GeneratedPapers from "@/components/question-paper/GeneratedPapers";

export default function QuestionPaperGenerator() {
  const [activeTab, setActiveTab] = useState("bank");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Question Paper Generator</h1>
          <p className="text-gray-600 mt-1">
            Create, manage, and generate question papers for examinations
          </p>
        </div>
        
        <Tabs defaultValue="bank" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="bank">Question Bank</TabsTrigger>
            <TabsTrigger value="patterns">Exam Patterns</TabsTrigger>
            <TabsTrigger value="generator">Paper Generator</TabsTrigger>
            <TabsTrigger value="papers">Generated Papers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bank" className="animate-fade-in">
            <QuestionBankManager />
          </TabsContent>
          
          <TabsContent value="patterns" className="animate-fade-in">
            <ExamPatterns />
          </TabsContent>
          
          <TabsContent value="generator" className="animate-fade-in">
            <PaperGenerator />
          </TabsContent>
          
          <TabsContent value="papers" className="animate-fade-in">
            <GeneratedPapers />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
