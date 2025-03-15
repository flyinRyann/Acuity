import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      

      {/* Dashboard Content */}
      <main className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium text-gray-800">Dashboard</h2>
          <Link href="/entry">
            <Button className="bg-zinc-800 hover:bg-zinc-700">Create Entry</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left Column */}
          <Card className="border-2 border-blue-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-md font-medium">Soft Skills</CardTitle>
              <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
                G
              </div>
            </CardHeader>
            <CardContent className="h-[500px]">
              {/* Content for Soft Skills */}
            </CardContent>
          </Card>

          {/* Middle Column */}
          <div className="flex flex-col gap-4 md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-md font-medium">Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                {/* Content for Overview */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-md font-medium">Tips</CardTitle>
                <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
                  G
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex gap-2">
                  <div className="bg-purple-100 border border-purple-500 px-2 py-1 rounded-md text-sm">
                    Learn
                  </div>
                  <div className="bg-purple-500 px-2 py-1 rounded-md text-sm text-white">
                    Kezia
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="h-12 bg-gray-200 rounded-md"></div>
                  <div className="h-12 bg-gray-200 rounded-md"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-md font-medium">Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-[150px]">
                {/* Content for second Overview */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-md font-medium">Last Entry</CardTitle>
              </CardHeader>
              <CardContent className="h-[330px]">
                {/* Content for Last Entry */}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}