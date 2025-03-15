"use client"
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bold, Italic, Underline, List, Link as LinkIcon } from "lucide-react";

export default function EntryPage() {
  // State for selected skills
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["Communication", "Adaptability"]);
  
  // State for confidence ratings
  const [confidenceRatings, setConfidenceRatings] = useState({
    Communication: 2,
    "Attention to detail": 4,
    Adaptability: 5
  });
  
  // Skills list
  const skillsList = [
    "Communication", "Leadership", "Problem-solving", "Time management",
    "Critical thinking", "Self-motivation", "Attention to detail", "Flexibility",
    "Growth mindset", "Adaptability", "Creativity"
  ];
  
  // Handle skill selection
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  
  // Update confidence rating
  const updateRating = (skill: string, value: number[]) => {
    setConfidenceRatings({
      ...confidenceRatings,
      [skill]: value[0]
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Back button */}
      <div className="mb-6">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5 mr-1" />
        </Link>
      </div>
      
      {/* Entry title */}
      <h1 className="text-xl font-medium text-center mb-8">Journal Entry #12</h1>
      
      {/* Skills development section */}
      <div className="mb-8">
        <p className="text-sm mb-2">Which soft skills did you develop today?</p>
        <div className="border-b border-gray-200 mb-4"></div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {skillsList.map((skill) => (
            <Badge 
              key={skill}
              variant={selectedSkills.includes(skill) ? "default" : "outline"}
              className={`rounded-full px-4 py-1 cursor-pointer ${
                selectedSkills.includes(skill) 
                  ? "bg-gray-800 text-white hover:bg-gray-700" 
                  : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => toggleSkill(skill)}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Confidence rating section */}
      <div className="mb-8">
        <p className="text-sm mb-2">On a scale of 1 to 5, how confident did you feel in your skills today?</p>
        <div className="border-b border-gray-200 mb-4"></div>
        
        <div className="space-y-6">
          {Object.entries(confidenceRatings).map(([skill, rating]) => (
            <div key={skill} className="space-y-2">
              <div className="flex justify-between">
                <span>{skill}</span>
                <span>{rating}</span>
              </div>
              <Slider
                defaultValue={[rating]}
                max={5}
                min={1}
                step={1}
                onValueChange={(value) => updateRating(skill, value)}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Reflection section */}
      <div className="mb-8">
        <p className="text-sm mb-2">Reflection</p>
        <div className="border-b border-gray-200 mb-4"></div>
        
        <Card className="border border-gray-200">
          <CardContent className="p-0">
            <div className="bg-gray-800 p-2 flex space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-white hover:bg-gray-700">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-white hover:bg-gray-700">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-white hover:bg-gray-700">
                <Underline className="h-4 w-4" />
              </Button>
              <div className="border-r border-gray-600 mx-1"></div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-white hover:bg-gray-700">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-white hover:bg-gray-700">
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
            <Textarea 
              className="border-0 focus-visible:ring-0 min-h-[120px] resize-none"
              placeholder="Reflect on how you applied these skills today. What went well? What could be improved? What did you learn?"
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-between">
        <Button variant="outline" className="bg-gray-200 hover:bg-gray-300 border-0">
          Save Draft
        </Button>
        <Button className="bg-gray-800 hover:bg-gray-700">
          Finish
        </Button>
      </div>
    </div>
  );
}