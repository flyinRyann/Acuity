"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from 'axios';

// Define interfaces for your data structures
interface Skill {
  id: string | number;
  name: string;
}

interface EntrySkill {
  id: string | number;
  confidence: number;
  skill: Skill;
}

interface JournalEntry {
  id: string | number;
  title?: string;
  reflection?: string;
  createdAt: string;
  entrySkills?: EntrySkill[];
}

export default function LastEntrySection() {
  const [lastEntry, setLastEntry] = useState<JournalEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLastEntry = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<JournalEntry>('/api/last');
        setLastEntry(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load entry');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLastEntry();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="col-span-1">
        <Card className="h-80 overflow-hidden">
          <CardHeader className="pb-0 flex flex-row items-center">
            <div className="p-1 bg-gray-200 rounded-full mr-2">
              <div className="h-4 w-4 bg-gray-600 rounded-full"></div>
            </div>
            <CardTitle>Last Entry</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[calc(100%-60px)]">
            <div className="text-gray-500">Loading...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="col-span-1">
        <Card className="h-80 overflow-hidden">
          <CardHeader className="pb-0 flex flex-row items-center">
            <div className="p-1 bg-gray-200 rounded-full mr-2">
              <div className="h-4 w-4 bg-gray-600 rounded-full"></div>
            </div>
            <CardTitle>Last Entry</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[calc(100%-60px)]">
            <div className="text-red-500">Failed to load entry data</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Empty state
  if (!lastEntry) {
    return (
      <div className="col-span-1">
        <Card className="h-80 overflow-hidden">
          <CardHeader className="pb-0 flex flex-row items-center">
            <div className="p-1 bg-gray-200 rounded-full mr-2">
              <div className="h-4 w-4 bg-gray-600 rounded-full"></div>
            </div>
            <CardTitle>Last Entry</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[calc(100%-60px)]">
            <div className="text-gray-500">No entries yet</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="col-span-1">
      <Card className="h-80 overflow-hidden">
        <CardHeader className="pb-0 flex flex-row items-center">
          <div className="p-1 bg-gray-200 rounded-full mr-2">
            <div className="h-4 w-4 bg-gray-600 rounded-full"></div>
          </div>
          <div>
            <CardTitle>Last Entry</CardTitle>
            <p className="text-sm text-gray-500">{new Date(lastEntry.createdAt).toLocaleDateString()}</p>
          </div>
        </CardHeader>
        <CardContent className="h-[calc(100%-80px)] overflow-hidden">
          <div className="h-full overflow-y-auto pr-2">
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <h3 className="font-medium">{lastEntry.title || "Journal Entry #" + lastEntry.id}</h3>
                {lastEntry.reflection && (
                  <p className="text-sm text-gray-600 mt-1">{lastEntry.reflection}</p>
                )}
              </div>

              {lastEntry.entrySkills && lastEntry.entrySkills.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-medium mb-3">Skills</h4>
                  <div className="space-y-3">
                    {lastEntry.entrySkills.map((entrySkill) => (
                      <div key={entrySkill.id}>
                        <p className="mb-1 text-sm">{entrySkill.skill.name}</p>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gray-700 rounded-full h-2" 
                            style={{ width: `${(entrySkill.confidence / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}