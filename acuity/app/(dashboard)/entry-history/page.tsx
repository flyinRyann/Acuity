import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Logo } from "../_components/logo";

import { Calendar, FileText } from "lucide-react";
import CreateEntryButton2 from "@/app/(dashboard)/_components/create-entry-button-2";
import React from "react";

// Sample data - replace with actual data fetching in production
const journalEntries = [
  {
    id: 1,
    date: "March 12, 2025",
    title: "Team Meeting Reflection",
    skills: ["Communication", "Listening"],
    summary: "Led a productive team meeting where I practiced active listening."
  },
  {
    id: 2,
    date: "March 10, 2025",
    title: "Client Presentation",
    skills: ["Presenting", "Communication"],
    summary: "Delivered a client presentation. Need to work on eye contact."
  },
  {
    id: 3,
    date: "March 5, 2025",
    title: "Conflict Resolution",
    skills: ["Emotional Intelligence", "Negotiation"],
    summary: "Mediated a disagreement between team members."
  },
];

export default function EntryHistory() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b">
        <div className="flex items-center">
          {/* Use the Logo component instead of text */}
          <Logo/>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Emily Gomez</span>
          <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b">
        <Link href="/" className="px-6 py-4 text-gray-600">
        Dashboard
        </Link>
        <Link href="/entry-history" className="px-6 py-4 border-b-2 border-black font-medium">
          Entry History
        </Link>
      </div>

      {/* Main Content */}
      <div className="p-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Recent Entries</h1>
          <p className="text-gray-600">Your skills development journey at a glance</p>
        </div>

        {/* Brief Entries List */}
        <div className="space-y-4">
          {journalEntries.map((entry) => (
            <Card key={entry.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{entry.title}</h3>
                    <div className="flex items-center text-gray-500 mt-1">
                      <Calendar size={14} className="mr-1"/>
                      <span className="text-xs">{entry.date}</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-full">
                    <FileText size={16} className="text-gray-600"/>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {entry.skills.map((skill, index) => (
                      <span key={index} className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">{entry.summary}</p>
                </div>

                <Link
                  href={`/entries/${entry.id}`}
                  className="text-xs text-gray-700 hover:text-black hover:underline mt-2 inline-block"
                >
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <CreateEntryButton2 className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"/>
        </div>

      </div>
    </div>
  );
}
