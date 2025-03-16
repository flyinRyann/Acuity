"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

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
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
    skillRatings: z.record(z.number().min(1).max(5))
});

const RatingPage = () => {
    const router = useRouter();
    const [entryName, setEntryName] = useState("Journal Entry #12");
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [isFormReady, setIsFormReady] = useState(false);
    
    // Initialize form with default values
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            skillRatings: {}
        }
    });

    // Load existing form data from localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedFormData = localStorage.getItem('formData');
            if (savedFormData) {
                const parsedData = JSON.parse(savedFormData);
                
                // Set entry name
                if (parsedData.entryName) {
                    setEntryName(parsedData.entryName);
                }
                
                // Set selected skills
                if (parsedData.selectedSkills && parsedData.selectedSkills.length > 0) {
                    setSelectedSkills(parsedData.selectedSkills);
                }
                
                // Initialize skillRatings with existing values or defaults
                const initialRatings: Record<string, number> = {};
                
                if (parsedData.selectedSkills) {
                    parsedData.selectedSkills.forEach((skill: string) => {
                        // Use existing ratings if available, otherwise default to 3
                        initialRatings[skill] = 
                            (parsedData.skillRatings && parsedData.skillRatings[skill]) || 3;
                    });
                }
                
                // Update form values
                form.reset({ skillRatings: initialRatings });
                setIsFormReady(true);
            }
        }
    }, [form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Get any existing form data or create new object
            const existingData = localStorage.getItem('formData') 
                ? JSON.parse(localStorage.getItem('formData') || '{}') 
                : {};
            
            // Update with skill ratings
            const formData = {
                ...existingData,
                skillRatings: values.skillRatings
            };
            
            // Store form data for next steps
            localStorage.setItem('formData', JSON.stringify(formData));
            
            // Navigate to the next page (could be a summary or journal entry page)
            router.push('/page4-journal');
        } catch (error) {
            console.log("Error saving form data:", error);
        }
    };

    // Wait until form is ready before rendering to avoid flicker
    if (!isFormReady && selectedSkills.length === 0) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

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
                            {/* Rating section header */}
                            <FormLabel className="text-xl font-medium">
                                On a scale of 1 to 5, how confident did you feel in your skills today?
                            </FormLabel>
                            <Separator className="mt-1 mb-6"/>
                            
                            {/* Skill rating sliders */}
                            <div className="space-y-6">
                                {selectedSkills.map((skill) => (
                                    <FormField
                                        key={skill}
                                        control={form.control}
                                        name={`skillRatings.${skill}`}
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <FormLabel className="text-base">
                                                        {skill}
                                                    </FormLabel>
                                                    <span className="text-lg font-medium">
                                                        {field.value}
                                                    </span>
                                                </div>
                                                <FormControl>
                                                    <div className="relative pt-1">
                                                        <Slider
                                                            value={[field.value]}
                                                            min={1}
                                                            max={5}
                                                            step={1}
                                                            onValueChange={(value) => {
                                                                field.onChange(value[0]);
                                                            }}
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
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
                            onClick={() => router.push('/page2-skill')}
                            className="mx-4 bg-gray-700 text-white hover:bg-gray-600 px-6"
                        >
                            Previous
                        </Button>

                        <div className="flex items-center space-x-3 mx-4">
                            <div className="h-2.5 w-2.5 rounded-full bg-gray-300"></div>
                            <div className="h-2.5 w-2.5 rounded-full bg-gray-300"></div>
                            <div className="h-2.5 w-2.5 rounded-full bg-gray-800"></div>
                            <div className="h-2.5 w-2.5 rounded-full bg-gray-300"></div>
                        </div>

                        <Button
                            type="button"
                            onClick={form.handleSubmit(onSubmit)}
                            className="mx-4 bg-gray-700 hover:bg-gray-600 px-6"
                        >   
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RatingPage;