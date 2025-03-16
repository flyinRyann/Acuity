"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormMessage,
    FormItem,
    FormLabel,
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
        if (typeof window === "undefined") return { entryName: "Journal Entry #12" };
        
        const savedFormData = localStorage.getItem('formData');
        if (savedFormData) {
            const parsedData = JSON.parse(savedFormData);
            return {
                entryName: parsedData.entryName || "Journal Entry #12",
            };
        }
        return { entryName: "Journal Entry #12" };
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
            router.push('/skills');
        } catch (error) {
            console.log("Error saving form data:", error);
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            {/* Back button */}
            <div className="mb-6">
                <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="h-5 w-5 mr-1" />
                </Link>
            </div>

            <div className="flex flex-col items-center justify-between min-h-[70vh]">
                <div className="w-full max-w-md flex-grow flex flex-col justify-center">
                    <Form {...form}>
                        <form 
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            {/* Entry name section */}
                            <div>
                                <FormField
                                    control={form.control}
                                    name="entryName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xl font-medium">
                                                Name your entry
                                            </FormLabel>
                                            <FormDescription className="text-md text-gray-600 mb-4">
                                                What would you like to name your journal entry? Don&apos;t worry, you can change this later!
                                            </FormDescription>
                                            <FormControl>
                                                <Input
                                                    disabled={isSubmitting}
                                                    placeholder="e.g. 'Journal Entry #12'"
                                                    className="text-base py-6"
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
                <div className="w-full mt-auto pt-8">
                    {/* Progress dots */}
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center space-x-2">
                            <div className="h-3 w-3 rounded-full bg-gray-800"></div>
                            <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                            <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                            <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                        </div>
                    </div>
                    
                    {/* Next button */}
                    <div className="flex justify-center">
                        <Button
                            type="button"
                            onClick={form.handleSubmit(onSubmit)}
                            className="bg-gray-800 hover:bg-gray-700 px-10 py-2 rounded-md"
                            disabled={!isValid || isSubmitting}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NameEntryPage;