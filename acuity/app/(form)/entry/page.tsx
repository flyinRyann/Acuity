"use client"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

export default function EntryNameAndSkills() {
  const router = useRouter();

  // State for journal name
  const [entryName, setEntryName] = useState("Journal Entry #12");

  // State for selected skills
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

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

  // Handle form submission
  const handleSubmit = () => {
    // Store the data in localStorage to pass to the next page
    localStorage.setItem('journalEntryName', entryName);
    localStorage.setItem('selectedSkills', JSON.stringify(selectedSkills));

    // Navigate to the second page
    router.push('/entry/confidence');
  };

  // Handle cancellation
  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Back button */}
      <div className="mb-6">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5 mr-1" />
        </Link>
      </div>

      {/* Entry name section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-2">Name your entry</h2>
        <p className="text-sm text-gray-600 mb-4">
          What would you like to name your journal entry? Don't worry you can change this later!
        </p>
        <Input
          placeholder="e.g. 'Journal Entry #12'"
          value={entryName}
          onChange={(e) => setEntryName(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Skills development section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-2">Which soft skills did you develop today?</h2>
        <p className="text-sm text-gray-600 mb-4">
          Click on the buttons representing the skills you improved on today!
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {skillsList.map((skill) => (
            <Badge
              key={skill}
              variant={selectedSkills.includes(skill) ? "default" : "outline"}
              className={`rounded-full px-4 py-2 cursor-pointer ${
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

      {/* Action buttons */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="px-6"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          className="bg-gray-800 hover:bg-gray-700 px-6"
          onClick={handleSubmit}
          disabled={selectedSkills.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
