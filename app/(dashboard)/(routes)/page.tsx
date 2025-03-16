
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "../_components/navbar";
import CreateEntryButton from "../_components/create-entry-button";
import { Eye, Users } from "lucide-react";
import React from 'react';
import LastEntrySection from "../_components/last-entry-section";


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="min-h-screen bg-white">
        <Navbar/>

      {/* Navigation Tabs */}
      <div className="flex border-b">
        <Link href="#" className="px-6 py-4 border-b-2 border-black font-medium">
          Dashboard
        </Link>
        <Link href="/entry-history" className="px-6 py-4 text-gray-600">
          Entry History
        </Link>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Create Entry Button/Dashboard */}
        <div className="flex justify-end items-center mb-6">
          <CreateEntryButton/>
        </div>

        {/* Dashboard Layout - Main Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Overview Section - Full Width */}
          <div className="col-span-1 md:col-span-2">
            <Card className="h-80 overflow-hidden" style={{ backgroundColor: "#464646" }}>
              <CardContent className="p-0 h-full flex items-center justify-center" style={{ backgroundColor: "#464646" }}>
                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "#464646" }}>
                  <img 
                    src="/dashboard.png" 
                    alt="Welcome to Acuity" 
                    className="max-w-full max-h-full w-auto h-auto"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Last Entry Section - Replaced with dynamic component */}
          <LastEntrySection />

          {/* Want to chat Section */}
          <div className="col-span-1">
            <Card className="h-64">
              <CardHeader>
                <div className="flex items-center">
                  <div className="p-1 bg-gray-200 rounded-full mr-2">
                    <div className="h-4 w-4 bg-gray-600 rounded-full"></div>
                  </div>
                  <CardTitle>Want to chat?</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="p-4">
                  <Image
                    src="/a-cutie.png"
                    alt="Acutie character"
                    width={120}
                    height={100}
                    className="mx-auto"
                  />
                </div>
                <p className="text-sm text-center text-gray-600">
                  Ask for soft skill advice from A-Cutie
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Daily Tips Section */}
          <div className="col-span-1 md:col-span-2">
            <Card className="h-64">
              <CardHeader className="pb-0">
                <div className="flex items-center">
                  <div className="p-1 bg-gray-200 rounded-full mr-2">
                    <div className="h-4 w-4 bg-gray-600 rounded-full"></div>
                  </div>
                  <CardTitle>Daily Tips</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="-mt-3">
                <div className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-lg flex">
                    <div className="bg-gray-200 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4">
                      <Eye size={20} className="text-gray-600"/>
                    </div>
                    <div>
                      <h4 className="font-medium">Improve eye contact when presenting</h4>
                      <p className="text-sm text-gray-500">This can help with audience engagement during your
                        presentation.</p>
                    </div>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg flex">
                    <div className="bg-gray-200 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4">
                      <Users size={20} className="text-gray-600"/>
                    </div>
                    <div>
                      <h4 className="font-medium">Do not be afraid to share your ideas</h4>
                      <p className="text-sm text-gray-500">Sharing your thoughts will expand more ideas for the
                        project.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}