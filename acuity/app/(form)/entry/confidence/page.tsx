"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft } from "lucide-react";

export default function ConfidenceRating() {
  const router = useRouter();

  // State for entry name
  const [entryName, setEntryName] = useState("");

  // State for selected skills
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // State for confidence ratings
  const [confidenceRatings, setConfidenceRatings] = useState<Record<string, number>>({});

  // Load data from previous step
  useEffect(() => {
    const storedEntryName = localStorage.getItem('journalEntryName');
    const storedSkills = localStorage.getItem('selectedSkills');

    if (storedEntryName) {
      setEntryName(storedEntryName);
    }

    if (storedSkills) {
      const skills = JSON.parse(storedSkills);
      setSelectedSkills(skills);

      // Initialize confidence ratings for each skill with a default value of 3
      const initialRatings: Record<string, number> = {};
      skills.forEach((skill: string) => {
        initialRatings[skill] = 3;
      });
      setConfidenceRatings(initialRatings);
    } else {
      // If no skills were selected, redirect back to the first page
      router.push('/entry');
    }
  }, [router]);

  // Update confidence rating
  const updateRating = (skill: string, value: number[]) => {
    setConfidenceRatings({
      ...confidenceRatings,
      [skill]: value[0]
    });
  };

  // Continue to reflection page
  const handleContinue = () => {
    // Store the confidence ratings in localStorage
    localStorage.setItem('confidenceRatings', JSON.stringify(confidenceRatings));

    // Navigate to the reflection page
    router.push('/entry/reflection');
  };

  // Handle save draft
  const handleSaveDraft = () => {
    // Save current state as draft
    const draft = {
      name: entryName,
      skills: selectedSkills,
      confidenceRatings
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
        <Link href="/entry" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5 mr-1" />
        </Link>
      </div>

      {/* Entry title */}
      <h1 className="text-xl font-medium text-center mb-8">{entryName}</h1>

      {/* Confidence rating section */}
      <div className="mb-8">
        <p className="text-sm mb-2">On a scale of 1 to 5, how confident did you feel in your skills today?</p>
        <div className="border-b border-gray-200 mb-4"></div>

        <div className="space-y-6">
          {selectedSkills.map((skill) => (
            <div key={skill} className="space-y-2">
              <div className="flex justify-between">
                <span>{skill}</span>
                <span>{confidenceRatings[skill] || 3}</span>
              </div>
              <Slider
                value={[confidenceRatings[skill] || 3]}
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
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
