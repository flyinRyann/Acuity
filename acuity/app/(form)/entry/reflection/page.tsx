"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";


export default function ReflectionPage() {
  const router = useRouter();

  // State for entry name
  const [entryName, setEntryName] = useState("");

  // State for selected skills
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // State for confidence ratings
  const [confidenceRatings, setConfidenceRatings] = useState<Record<string, number>>({});

  // State for reflection text
  const [reflection, setReflection] = useState("");

  // Load data from previous steps
  useEffect(() => {
    const storedEntryName = localStorage.getItem('journalEntryName');
    const storedSkills = localStorage.getItem('selectedSkills');
    const storedRatings = localStorage.getItem('confidenceRatings');

    if (storedEntryName) {
      setEntryName(storedEntryName);
    } else {
      router.push('/entry');
      return;
    }

    if (storedSkills) {
      setSelectedSkills(JSON.parse(storedSkills));
    } else {
      router.push('/entry');
      return;
    }

    if (storedRatings) {
      setConfidenceRatings(JSON.parse(storedRatings));
    } else {
      router.push('/entry/confidence');
      return;
    }
  }, [router]);

  // Handle form submission
  const handleSubmit = () => {
    // Here you would typically save the complete entry to your database
    const completeEntry = {
      name: entryName,
      skills: selectedSkills,
      confidenceRatings,
      reflection
    };

    console.log('Complete journal entry:', completeEntry);

    // Clear localStorage
    localStorage.removeItem('journalEntryName');
    localStorage.removeItem('selectedSkills');
    localStorage.removeItem('confidenceRatings');

    // Navigate back to home or to a success page
    router.push('/');
  };

  // Handle save draft
  const handleSaveDraft = () => {
    // Save current state as draft
    const draft = {
      name: entryName,
      skills: selectedSkills,
      confidenceRatings,
      reflection
    };

    console.log('Saving draft:', draft);
    // In a real app, you would save this to your database as a draft

    // Navigate back to home
    router.push('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Back button */}
      <div className="mb-6">
        <Link href="/entry/confidence" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5 mr-1" />
        </Link>
      </div>

      {/* Entry title */}
      <h1 className="text-xl font-medium text-center mb-8">{entryName}</h1>

      {/* Reflection section */}
      <div className="mb-8">
        <p className="text-sm mb-2">Reflection</p>
        <p className="text-sm text-gray-600 mb-4">
          Reflect on how you applied these skills today. What went well? What could be improved? What did you learn?
        </p>
        <div className="border-b border-gray-200 mb-4"></div>

        <Card className="border border-gray-200">
          <CardContent className="p-0">

            <Textarea
              className="border-0 focus-visible:ring-0 min-h-[200px] resize-none"
              placeholder="Write your reflection here..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Action buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          className="bg-gray-200 hover:bg-gray-300 border-0"
          onClick={handleSaveDraft}
        >
          Save Draft
        </Button>
        <Button
          className="bg-gray-800 hover:bg-gray-700"
          onClick={handleSubmit}
        >
          Finish
        </Button>
      </div>
    </div>
  );
}
