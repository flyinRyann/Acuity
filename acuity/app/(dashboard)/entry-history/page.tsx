"use client"

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Logo } from "../_components/logo";
import { Calendar, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import CreateEntryButton2 from "@/app/(dashboard)/_components/create-entry-button-2";
import React, { useEffect, useState } from "react";
import { Navbar } from "../_components/navbar";

// Define types for our data
interface Skill {
  id: string;
  name: string;
}

interface EntrySkill {
  id: string;
  confidence: number;
  skill: Skill;
}

interface Entry {
  id: string;
  title: string;
  reflection: string | null;
  createdAt: string;
  entrySkills: EntrySkill[];
}

interface PaginationData {
  total: number;
  pages: number;
  currentPage: number;
  limit: number;
}

export default function EntryHistory() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchEntries = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/history?page=${page}&limit=10`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch entries");
      }
      
      const data = await response.json();
      setEntries(data.entries);
      setPagination(data.pagination);
      setCurrentPage(page);
      setError(null);
    } catch (err) {
      setError("Something went wrong while fetching your entries");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (pagination && newPage > 0 && newPage <= pagination.pages) {
      fetchEntries(newPage);
    }
  };

  // Format date for display using native JavaScript
  const formatEntryDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Extract skills from entrySkills array
  const extractSkills = (entrySkills: EntrySkill[]) => {
    return entrySkills.map(es => es.skill.name);
  };

  // Create a summary from reflection text
  const createSummary = (reflection: string | null) => {
    if (!reflection) return "No reflection provided.";
    
    // Truncate to approximately 100 characters
    return reflection.length > 100 
      ? `${reflection.substring(0, 100).trim()}...` 
      : reflection;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navbar/>

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

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse text-gray-400">Loading entries...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md text-red-700">
            {error}
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">You haven't created any entries yet.</p>
            <div className="mt-4">
              <CreateEntryButton2 />
            </div>
          </div>
        ) : (
          <>
            {/* Brief Entries List */}
            <div className="space-y-4">
              {entries.map((entry) => (
                <Card key={entry.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{entry.title}</h3>
                        <div className="flex items-center text-gray-500 mt-1">
                          <Calendar size={14} className="mr-1"/>
                          <span className="text-xs">{formatEntryDate(entry.createdAt)}</span>
                        </div>
                      </div>
                      <div className="bg-gray-100 p-2 rounded-full">
                        <FileText size={16} className="text-gray-600"/>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {extractSkills(entry.entrySkills).map((skill, index) => (
                          <span key={index} className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm">{createSummary(entry.reflection)}</p>
                    </div>

                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="flex justify-center items-center mt-6 gap-2">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm">
                  Page {currentPage} of {pagination.pages}
                </span>
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.pages}
                  className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            <div className="mt-6">
              <CreateEntryButton2 />
            </div>
          </>
        )}
      </div>
    </div>
  );
}