"use client"

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Logo } from "../_components/logo";
import { Calendar, FileText, ChevronLeft, ChevronRight, Search } from "lucide-react";
import CreateEntryButton2 from "@/app/(dashboard)/_components/create-entry-button-2";
import React, { useEffect, useState } from "react";
import { Navbar } from "../_components/navbar";
import { Input } from "@/components/ui/input";

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
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchEntries = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/history?page=${page}&limit=10`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch entries");
      }
      
      const data = await response.json();
      setEntries(data.entries);
      setFilteredEntries(data.entries);
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

  // Filter entries based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredEntries(entries);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = entries.filter(entry => 
      entry.title.toLowerCase().includes(query) || 
      (entry.reflection && entry.reflection.toLowerCase().includes(query))
    );
    
    setFilteredEntries(filtered);
  }, [searchQuery, entries]);

  const handlePageChange = (newPage: number) => {
    if (pagination && newPage > 0 && newPage <= pagination.pages) {
      fetchEntries(newPage);
      setSearchQuery(""); // Clear search when changing pages
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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

  // Get full reflection text
  const getReflectionText = (reflection: string | null) => {
    if (!reflection) return "No reflection provided.";
    return reflection;
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

      <div className="p-4">
        {/* Create Entry Button/Dashboard */}
        <div className="flex justify-end items-center mb-6">
          <CreateEntryButton2/>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="p-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Recent Entries</h1>
              <p className="text-gray-600">Your skills development journey at a glance</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                type="text"
                placeholder="Search entries..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse text-gray-400">Loading entries...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md text-red-700">
            {error}
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="text-center py-8">
            {searchQuery ? (
              <div>
                <p className="text-gray-500">No entries match your search.</p>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="text-orange-600 hover:underline mt-2"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div>
                <p className="text-gray-500">You haven't created any entries yet.</p>
                <div className="mt-4">
                  <CreateEntryButton2 />
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Brief Entries List */}
            <div className="space-y-4">
              {filteredEntries.map((entry) => (
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
                      <p className="text-gray-600 text-sm whitespace-pre-wrap">{getReflectionText(entry.reflection)}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination - Only show when not searching */}
            {!searchQuery && pagination && pagination.pages > 1 && (
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

            <div className="mt-6 flex justify-between items-center">
              <CreateEntryButton2 />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Clear search
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}