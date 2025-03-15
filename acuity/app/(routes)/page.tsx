import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "../(dashboard)/_components/logo";
import { Navbar } from "../(dashboard)/_components/navbar";
import CreateEntryButton from "../(dashboard)/_components/create-entry-button";
import { Eye, Users } from "lucide-react";
import React from 'react';


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
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
          {/* Welcome Banner - Full Width - Replacing "Who Are We?" */}
          <div className="col-span-1 md:col-span-2">
            <div className="h-80 rounded-lg overflow-hidden" style={{ backgroundColor: "#464646" }}>
              <div className="relative h-full w-full flex items-center justify-center">
                <Image
                  src="/welcome.png"
                  alt="Welcome to Acuity"
                  fill
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center'
                  }}
                  className="block"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Last Entry Section */}
          <div className="col-span-1">
            <Card className="h-80 overflow-hidden">
              <CardHeader className="pb-0">
                <CardTitle>Last Entry</CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-60px)] overflow-hidden">
                <div className="h-full overflow-y-auto pr-2">
                  <div className="space-y-6 py-2">
                    <h3 className="font-medium text-lg">Skills</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="mb-1">Communication</p>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div className="bg-gray-700 rounded-full h-2 w-4/5"></div>
                        </div>
                      </div>

                      <div>
                        <p className="mb-1">Listening</p>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div className="bg-gray-700 rounded-full h-2 w-3/5"></div>
                        </div>
                      </div>

                      <div>
                        <p className="mb-1">Presenting</p>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div className="bg-gray-700 rounded-full h-2 w-2/5"></div>
                        </div>
                      </div>

                      <div>
                        <p className="mb-1">Talking</p>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div className="bg-gray-700 rounded-full h-2 w-1/4"></div>
                        </div>
                      </div>

                      {/* Additional content to demonstrate scrolling */}
                      <div>
                        <p className="mb-1">Critical Thinking</p>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div className="bg-gray-700 rounded-full h-2 w-3/5"></div>
                        </div>
                      </div>

                      <div>
                        <p className="mb-1">Problem Solving</p>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div className="bg-gray-700 rounded-full h-2 w-4/5"></div>
                        </div>
                      </div>

                      <div>
                        <p className="mb-1">Teamwork</p>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div className="bg-gray-700 rounded-full h-2 w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

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
              <CardHeader>
                <div className="flex items-center">
                  <div className="p-1 bg-gray-200 rounded-full mr-2">
                    <div className="h-4 w-4 bg-gray-600 rounded-full"></div>
                  </div>
                  <CardTitle>Daily Tips</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
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
                      <h4 className="font-medium">Don't be afraid to share your ideas</h4>
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
  );
}
