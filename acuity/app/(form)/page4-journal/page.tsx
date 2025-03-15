"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
    FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { 
    Bold, 
    Italic, 
    Underline, 
    Heading, 
    List, 
    ListOrdered, 
    Link as LinkIcon, 
    Image as ImageIcon, 
    MoreHorizontal,
    Maximize2
} from "lucide-react";

const formSchema = z.object({
    journalEntry: z.string().min(1, {
        message: "Please write a reflection before submitting",
    }),
});

const JournalEntryPage = () => {
    const router = useRouter();
    const [entryName, setEntryName] = useState("Journal Entry #12");
    
    // Load existing form data from localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedFormData = localStorage.getItem('formData');
            if (savedFormData) {
                const parsedData = JSON.parse(savedFormData);
                if (parsedData.entryName) {
                    setEntryName(parsedData.entryName);
                }
            }
        }
    }, []);

    // Initialize form with default values
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            journalEntry: "",
        }
    });

    // Load any saved journal entry from localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedFormData = localStorage.getItem('formData');
            if (savedFormData) {
                const parsedData = JSON.parse(savedFormData);
                if (parsedData.journalEntry) {
                    form.setValue("journalEntry", parsedData.journalEntry);
                }
            }
        }
    }, [form]);

    const { isSubmitting } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Get any existing form data or create new object
            const existingData = localStorage.getItem('formData') 
                ? JSON.parse(localStorage.getItem('formData') || '{}') 
                : {};
            
            // Update with journal entry
            const formData = {
                ...existingData,
                journalEntry: values.journalEntry
            };
            
            // Store form data
            localStorage.setItem('formData', JSON.stringify(formData));
            
            // Navigate to completion page or submit form data to API
            router.push('/');
            
            // Alternatively, if you want to post to an API:
            /*
            const response = await fetch('/api/submit-journal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
                router.push('/completion');
            } else {
                console.error('Error submitting form data');
            }
            */
        } catch (error) {
            console.log("Error saving form data:", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            {/* Header with back button and logo */}
            <div className="flex items-center mb-16">
                <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="h-5 w-5 mr-3" />
                </Link>
                <div className="flex-grow flex justify-center">
                    <Image 
                        src="/acuity-logo.png"
                        alt="Acuity Logo"
                        width={100}
                        height={30}
                    />
                </div>
                <div className="w-5"></div> {/* Spacer for alignment */}
            </div>

            <div className="flex flex-col min-h-[60vh]">
                <div className="flex-grow">
                    {/* Entry name display */}
                    <h1 className="text-2xl font-medium text-center mb-10">{entryName}</h1>
                    
                    <Form {...form}>
                        <form 
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            {/* Journal entry section */}
                            <div>
                                <FormField
                                    control={form.control}
                                    name="journalEntry"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xl font-medium">
                                                Reflect on how you applied these skills today...
                                            </FormLabel>
                                            <div className="text-sm text-gray-500">
                                                What went well? What could be improved? What did you learn?
                                            </div>
                                            <Separator className="mt-1 mb-6"/>
                                            
                                            {/* Text editor toolbar */}
                                            <div className="bg-gray-700 text-white p-2 rounded-t-md flex items-center space-x-4">
                                                <button type="button" className="p-1.5 hover:bg-gray-600 rounded">
                                                    <Bold size={18} />
                                                </button>
                                                <button type="button" className="p-1.5 hover:bg-gray-600 rounded">
                                                    <Italic size={18} />
                                                </button>
                                                <button type="button" className="p-1.5 hover:bg-gray-600 rounded">
                                                    <Underline size={18} />
                                                </button>
                                                <button type="button" className="p-1.5 hover:bg-gray-600 rounded">
                                                    <Heading size={18} />
                                                </button>
                                                <div className="h-5 w-px bg-gray-400"></div>
                                                <button type="button" className="p-1.5 hover:bg-gray-600 rounded">
                                                    <ListOrdered size={18} />
                                                </button>
                                                <button type="button" className="p-1.5 hover:bg-gray-600 rounded">
                                                    <List size={18} />
                                                </button>
                                                <div className="h-5 w-px bg-gray-400"></div>
                                                <button type="button" className="p-1.5 hover:bg-gray-600 rounded">
                                                    <LinkIcon size={18} />
                                                </button>
                                                <button type="button" className="p-1.5 hover:bg-gray-600 rounded">
                                                    <ImageIcon size={18} />
                                                </button>
                                                <button type="button" className="p-1.5 hover:bg-gray-600 rounded">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </div>
                                            
                                            <FormControl>
                                                <div className="relative">
                                                    <textarea
                                                        {...field}
                                                        placeholder="Write your reflection..."
                                                        className="w-full min-h-[200px] p-4 border border-gray-300 rounded-b-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                                                    />
                                                    <button 
                                                        type="button"
                                                        className="absolute bottom-3 right-3 text-gray-500 hover:text-gray-700"
                                                    >
                                                        <Maximize2 size={18} />
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>
                </div>

                {/* Bottom section with navigation buttons and progress indicator */}
                <div className="mt-auto pt-10">
                    <div className="flex justify-center items-center mb-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push('/page3-rating')}
                            className="mx-4 bg-gray-700 text-white hover:bg-gray-600 px-6"
                        >
                            Previous
                        </Button>

                        <div className="flex items-center space-x-3 mx-4">
                            <div className="h-2.5 w-2.5 rounded-full bg-gray-300"></div>
                            <div className="h-2.5 w-2.5 rounded-full bg-gray-300"></div>
                            <div className="h-2.5 w-2.5 rounded-full bg-gray-300"></div>
                            <div className="h-2.5 w-2.5 rounded-full bg-gray-800"></div>
                        </div>

                        <Button
                            type="button"
                            onClick={form.handleSubmit(onSubmit)}
                            className="mx-4 bg-gray-700 hover:bg-gray-600 px-6"
                        >
                            <div className="flex items-center">
                                <span>Submit</span>
                                <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JournalEntryPage;