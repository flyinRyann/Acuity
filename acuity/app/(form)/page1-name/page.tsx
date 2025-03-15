"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

const formSchema = z.object({
    entryName: z.string().min(1, {
        message: "Entry name is required",
    }),
});

const NameEntryPage = () =>  {
    const router = useRouter();
    
    // Load any existing form data from localStorage

    const loadSavedData = () => {
        if (typeof window === "undefined") return { entryName: "" };
        
        const savedFormData = localStorage.getItem('formData');
        if (savedFormData) {
            const parsedData = JSON.parse(savedFormData);
            return {
                entryName: parsedData.entryName || "",
            };
        }
        return { entryName: "" };
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: loadSavedData(),
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Get any existing form data or create new object
            const existingData = localStorage.getItem('formData') 
                ? JSON.parse(localStorage.getItem('formData') || '{}') 
                : {};
            
            // Update with new entryName
            const formData = {
                ...existingData,
                entryName: values.entryName
            };
            
            // Store form data for next steps
            localStorage.setItem('formData', JSON.stringify(formData));
            
            // Navigate to the next page (skills selection)
            router.push('/page2-skill');
        } catch (error) {
            console.log("Error saving form data:", error);
        }
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
                <div className="flex-grow flex flex-col justify-center">
                    <Form {...form}>
                        <form 
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            {/* Entry name section */}
                            <div>
                                <FormField
                                    control={form.control}
                                    name="entryName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-2xl font-medium">
                                                Name Your Entry
                                            </FormLabel>
                                            <FormDescription className="text-base text-gray-600 mt-2 mb-8">
                                                What would you like to name your journal entry?
                                            </FormDescription>
                                            <FormControl>
                                                <Input
                                                    disabled={isSubmitting}
                                                    placeholder="e.g. 'Journal Entry #12'"
                                                    className="text-base py-6 px-4 bg-gray-100 border-0 rounded-md"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>
                </div>

                {/* Bottom section with progress indicator and next button */}
                <div className="mt-auto pt-16">
                    {/* Progress dots */}
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="h-2.5 w-2.5 rounded-full bg-gray-800"></div>
                            <div className="h-2.5 w-2.5 rounded-full bg-gray-300"></div>
                            <div className="h-2.5 w-2.5 rounded-full bg-gray-300"></div>
                            <div className="h-2.5 w-2.5 rounded-full bg-gray-300"></div>
                        </div>
                    </div>
                    
                    {/* Next button */}
                    <div className="flex justify-center">
                        <Button
                            type="button"
                            onClick={form.handleSubmit(onSubmit)}
                            className="bg-gray-800 hover:bg-gray-700 px-12 py-2 rounded-md"
                            disabled={!isValid || isSubmitting}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NameEntryPage;