import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "../_components/logo";
import { Navbar } from "../_components/navbar";
import CreateEntryButton from "../_components/create-entry-button";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar/>

      {/* Main */}
      <div className="p-4">

        {/* Create Entry Button/Dashboard */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium text-gray-800">Dashboard</h2>
          <CreateEntryButton/>
        </div>

        {/* TODO: CREATE DASHBOARD COMPONENTS */}

      </div>  
    </div>
  );
}