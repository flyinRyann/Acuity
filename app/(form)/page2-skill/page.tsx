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
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
    FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
    selectedSkills: z.array(z.string()).min(1, {
        message: "Please select at least one skill",
    }),
});

const SkillsSelectionPage = () => {
    const router = useRouter();
    const [entryName, setEntryName] = useState("Journal Entry #12");
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    
    // Skills list
    const skillsList = [
        "Communication", "Leadership", "Problem-solving", "Time management",
        "Critical thinking", "Self-motivation", "Attention to detail", "Flexibility",
        "Growth mindset", "Adaptability", "Creativity"
    ];

    // Load any existing form data from localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedFormData = localStorage.getItem('formData');
            if (savedFormData) {
                const parsedData = JSON.parse(savedFormData);
                if (parsedData.entryName) {
                    setEntryName(parsedData.entryName);
                }
                
                // Check if we already have skills selected to enable the button
                if (parsedData.selectedSkills && parsedData.selectedSkills.length > 0) {
                    setIsButtonEnabled(true);
                }
            }
        }
    }, []);

    const loadSavedSkills = () => {
        if (typeof window === "undefined") return { selectedSkills: [] };
        
        const savedFormData = localStorage.getItem('formData');
        if (savedFormData) {
            const parsedData = JSON.parse(savedFormData);
            return {
                selectedSkills: parsedData.selectedSkills || [],
            };
        }
        return { selectedSkills: [] };
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: loadSavedSkills(),
    });

    const { isSubmitting } = form.formState;
    const selectedSkills = form.watch("selectedSkills");
    
    // Update button state whenever selectedSkills changes
    useEffect(() => {
        setIsButtonEnabled(selectedSkills.length > 0);
    }, [selectedSkills]);

    // Handle skill selection
    const toggleSkill = (skill: string) => {
        const currentSkills = form.getValues("selectedSkills");
        if (currentSkills.includes(skill)) {
            form.setValue("selectedSkills", currentSkills.filter(s => s !== skill), {
                shouldValidate: true
            });
        } else {
            form.setValue("selectedSkills", [...currentSkills, skill], {
                shouldValidate: true
            });
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Get any existing form data or create new object
            const existingData = localStorage.getItem('formData') 
                ? JSON.parse(localStorage.getItem('formData') || '{}') 
                : {};
            
            // Update with selected skills
            const formData = {
                ...existingData,
                selectedSkills: values.selectedSkills
            };
            
            // Store form data for next steps
            localStorage.setItem('formData', JSON.stringify(formData));
            
            // Navigate to the next page
            router.push('/page3-rating');
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
                            className="space-y-4"
                        >
                            {/* Skills selection section */}
                            <div>
                                <FormField
                                    control={form.control}
                                    name="selectedSkills"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel className="text-xl font-medium">
                                                Which soft skills did you develop today?
                                            </FormLabel>
                                            <FormDescription className="text-base text-gray-500">
                                                Click on the buttons representing the skills you improved on today!
                                            </FormDescription>
                                            <Separator className="mt-1 mb-6"/>
                                            <FormControl>
                                                <div className="flex flex-wrap gap-3">
                                                    {skillsList.map((skill) => (
                                                        <button
                                                            key={skill}
                                                            type="button"
                                                            className={`px-4 py-3 rounded-md border ${
                                                                selectedSkills.includes(skill)
                                                                    ? "bg-gray-700 text-white border-gray-700"
                                                                    : "bg-white text-gray-800 border-gray-300"
                                                            }`}
                                                            onClick={() => toggleSkill(skill)}
                                                        >
                                                            {skill}
                                                        </button>
                                                    ))}
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
                    {/* Progress dots and navigation */}
                    <div className="flex justify-center items-center mb-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push('/page1-name')}
                            className="mx-4 bg-gray-700 text-white hover:bg-gray-600 px-6"
                        >
                            Previous
                        </Button>

                        <div className="flex items-center space-x-3 mx-4">
                            <div className="h-2.5 w-2.5 rounded-full bg-gray-300"></div>
                            <div className="h-2.5 w-2.5 rounded-full bg-gray-800"></div>
                            <div className="h-2.5 w-2.5 rounded-full bg-gray-300"></div>
                            <div className="h-2.5 w-2.5 rounded-full bg-gray-300"></div>
                        </div>

                        <Button
                            type="button"
                            onClick={form.handleSubmit(onSubmit)}
                            className={`mx-4 px-6 ${
                                isButtonEnabled 
                                ? "bg-gray-700 hover:bg-gray-600 cursor-pointer" 
                                : "bg-gray-400 cursor-not-allowed"
                            }`}
                            disabled={!isButtonEnabled || isSubmitting}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillsSelectionPage;