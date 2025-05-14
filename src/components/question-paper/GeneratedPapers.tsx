
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
import { useToast } from "@/components/ui/use-toast";
import { 
  Download, 
  Printer, 
  Eye, 
  Search, 
  FileText, 
  Clock, 
  Filter, 
  Trash,
  X,
  Check,
} from "lucide-react";
import { GeneratedPaper } from "@/types/question";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Sample data for generated papers
const samplePapers: GeneratedPaper[] = [
  {
    id: "paper-1",
    name: "Mid-Term Examination 2025",
    totalMarks: 100,
    duration: 180,
    subject: "Computer Science",
    pattern: {
      id: "pattern-1",
      name: "Standard Mid-Term",
      totalMarks: 100,
      duration: 180,
      sections: [
        {
          name: "Multiple Choice Questions",
          questionTypes: ["Multiple Choice"],
          questionCount: 30,
          difficultyDistribution: { easy: 40, medium: 40, hard: 20 },
          marksPerQuestion: 1,
        },
        {
          name: "Short Answer Questions",
          questionTypes: ["Short Answer"],
          questionCount: 10,
          difficultyDistribution: { easy: 30, medium: 50, hard: 20 },
          marksPerQuestion: 4,
        },
        {
          name: "Long Answer Questions",
          questionTypes: ["Long Answer"],
          questionCount: 2,
          difficultyDistribution: { easy: 0, medium: 50, hard: 50 },
          marksPerQuestion: 15,
        },
      ],
    },
    questions: [],  // Simplified for sample
    createdAt: new Date("2025-05-01T10:30:00"),
    createdBy: "admin",
  },
  {
    id: "paper-2",
    name: "Final Examination 2025",
    totalMarks: 150,
    duration: 240,
    subject: "Database Management",
    pattern: {
      id: "pattern-2",
      name: "Comprehensive Final",
      totalMarks: 150,
      duration: 240,
      sections: [
        {
          name: "Multiple Choice Questions",
          questionTypes: ["Multiple Choice"],
          questionCount: 50,
          difficultyDistribution: { easy: 30, medium: 50, hard: 20 },
          marksPerQuestion: 1,
        },
        {
          name: "Short Answer Questions",
          questionTypes: ["Short Answer"],
          questionCount: 15,
          difficultyDistribution: { easy: 20, medium: 60, hard: 20 },
          marksPerQuestion: 4,
        },
        {
          name: "Programming Questions",
          questionTypes: ["Long Answer"],
          questionCount: 2,
          difficultyDistribution: { easy: 0, medium: 50, hard: 50 },
          marksPerQuestion: 10,
        },
      ],
    },
    questions: [],  // Simplified for sample
    createdAt: new Date("2025-06-15T09:00:00"),
    createdBy: "admin",
  },
];

export default function GeneratedPapers() {
  const { toast } = useToast();
  const [papers, setPapers] = useState<GeneratedPaper[]>(samplePapers);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [viewingPaper, setViewingPaper] = useState<GeneratedPaper | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleDeletePaper = (paperId: string) => {
    setPapers(papers.filter(paper => paper.id !== paperId));
    setConfirmDelete(null);
    toast({
      title: "Paper Deleted",
      description: "The question paper has been removed.",
    });
  };

  const handleDuplicatePaper = (paper: GeneratedPaper) => {
    const duplicatedPaper = {
      ...paper,
      id: `paper-${Date.now()}`,
      name: `${paper.name} (Copy)`,
      createdAt: new Date(),
    };
    
    setPapers([...papers, duplicatedPaper]);
    toast({
      title: "Paper Duplicated",
      description: `${paper.name} has been duplicated.`,
    });
  };

  const handleDownload = (paper: GeneratedPaper) => {
    // In a real app, this would generate and download a PDF
    toast({
      title: "Download Started",
      description: `${paper.name} is being prepared for download.`,
    });
  };

  const handlePrint = (paper: GeneratedPaper) => {
    // In a real app, this would open the print dialog
    toast({
      title: "Preparing for Print",
      description: `${paper.name} is being prepared for printing.`,
    });
  };

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  // Filter papers based on search query and active filters
  const filteredPapers = papers.filter(paper => {
    // Search filtering
    const matchesSearch = 
      paper.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Subject filtering
    if (activeFilters.length > 0) {
      return matchesSearch && activeFilters.includes(paper.subject);
    }
    
    return matchesSearch;
  });

  // Get unique subjects for filtering
  const subjects = Array.from(new Set(papers.map(paper => paper.subject)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search papers..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                {activeFilters.length > 0 && (
                  <Badge className="ml-2 bg-blue-500" variant="default">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by Subject</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {subjects.map((subject) => (
                <DropdownMenuItem 
                  key={subject}
                  onClick={() => toggleFilter(subject)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  {subject}
                  {activeFilters.includes(subject) && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                </DropdownMenuItem>
              ))}
              {activeFilters.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => setActiveFilters([])}
                    className="text-red-500 cursor-pointer"
                  >
                    Clear Filters
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map(filter => (
            <Badge 
              key={filter}
              className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer pl-3"
              onClick={() => toggleFilter(filter)}
              variant="outline"
            >
              {filter}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setActiveFilters([])}
            className="text-sm text-gray-500"
          >
            Clear All
          </Button>
        </div>
      )}
      
      {filteredPapers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper) => (
            <Card key={paper.id} className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex justify-between items-start gap-2">
                  <div className="truncate">{paper.name}</div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                    {paper.totalMarks} marks
                  </Badge>
                </CardTitle>
                <CardDescription className="flex justify-between items-center">
                  <span>{paper.subject}</span>
                  <span className="flex items-center text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {paper.duration} min
                  </span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="text-sm text-gray-600">
                  <div className="mb-1">
                    <span className="font-medium">Pattern:</span> {paper.pattern.name}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {paper.pattern.sections.map((section, idx) => (
                      <div key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {section.questionCount} {section.questionTypes[0]}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-3 flex justify-between">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setViewingPaper(paper)}
                >
                  <Eye className="h-4 w-4 mr-1" /> Preview
                </Button>
                
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => handleDownload(paper)}
                        className="cursor-pointer"
                      >
                        <Download className="h-4 w-4 mr-2" /> Download
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handlePrint(paper)}
                        className="cursor-pointer"
                      >
                        <Printer className="h-4 w-4 mr-2" /> Print
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDuplicatePaper(paper)}
                        className="cursor-pointer"
                      >
                        <FileText className="h-4 w-4 mr-2" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => setConfirmDelete(paper.id)}
                        className="text-red-500 cursor-pointer"
                      >
                        <Trash className="h-4 w-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-0 shadow-md">
          <CardContent className="p-8 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-medium text-xl text-gray-900">
              No Papers Found
            </h3>
            <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
              {papers.length === 0 
                ? "Start by generating a new question paper from the Paper Generator tab."
                : "No papers match your search criteria. Try changing your filters."}
            </p>
          </CardContent>
        </Card>
      )}
      
      {/* Paper Preview Dialog */}
      <Dialog open={!!viewingPaper} onOpenChange={(open) => !open && setViewingPaper(null)}>
        {viewingPaper && (
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <div>{viewingPaper.name}</div>
                <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                  {viewingPaper.totalMarks} marks
                </Badge>
              </DialogTitle>
              <DialogDescription className="flex justify-between">
                <span>{viewingPaper.subject}</span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {viewingPaper.duration} minutes
                </span>
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="p-4 border rounded-md bg-gray-50">
                <div className="text-center mb-4">
                  <h3 className="font-bold text-xl">{viewingPaper.name}</h3>
                  <p className="text-gray-600">
                    {viewingPaper.subject} • {viewingPaper.totalMarks} Marks • {viewingPaper.duration} Minutes
                  </p>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <p className="text-sm text-gray-500 italic">
                    Instructions: Answer all questions. Each question carries marks as indicated.
                  </p>
                </div>
                
                {viewingPaper.pattern.sections.map((section, sectionIdx) => (
                  <div key={sectionIdx} className="mt-6">
                    <h4 className="font-bold border-b pb-2 mb-4">
                      Section {sectionIdx + 1}: {section.name} ({section.questionCount * section.marksPerQuestion} marks)
                    </h4>
                    
                    <div className="space-y-4">
                      {Array.from({ length: Math.min(5, section.questionCount) }, (_, i) => (
                        <div key={i} className="pl-4 border-l-2 border-gray-200">
                          <div className="flex justify-between">
                            <span className="font-medium">Question {sectionIdx + 1}.{i + 1}</span>
                            <span className="text-sm text-gray-600">{section.marksPerQuestion} marks</span>
                          </div>
                          
                          <p className="mt-1">
                            {section.questionTypes[0] === "Multiple Choice" 
                              ? "Which of the following statements is correct about database normalization?"
                              : section.questionTypes[0] === "Short Answer"
                              ? "Explain the concept of database indexing and its importance."
                              : "Describe the CAP theorem and explain its implications for distributed database systems."}
                          </p>
                          
                          {section.questionTypes[0] === "Multiple Choice" && (
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <div className="text-sm p-2 bg-white border rounded-md">
                                a. It helps reduce data redundancy
                              </div>
                              <div className="text-sm p-2 bg-white border rounded-md">
                                b. It increases data redundancy
                              </div>
                              <div className="text-sm p-2 bg-white border rounded-md">
                                c. It has no effect on data integrity
                              </div>
                              <div className="text-sm p-2 bg-white border rounded-md">
                                d. All of the above
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {section.questionCount > 5 && (
                        <div className="text-center text-gray-500 italic text-sm">
                          (Showing 5 sample questions out of {section.questionCount})
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline"
                onClick={() => handlePrint(viewingPaper)}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button 
                onClick={() => handleDownload(viewingPaper)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!confirmDelete} onOpenChange={(open) => !open && setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this question paper? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setConfirmDelete(null)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={() => confirmDelete && handleDeletePaper(confirmDelete)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
