"use client"

import * as  z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
    FormItem
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
});

const NameEntry = () => {
const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: ""
    },
});

const { isSubmitting, isValid } = form.formState;

const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
}

    return (
        <div className="max-w-5xl mx-auto md:items-center md:justify-center h-full p-6"> 
            <div className="mb-6">
                <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="h-5 w-5 mr-1" />
                </Link>
            </div>
            <h1 className="text-2xl">
                Name your entry
            </h1>
            <p className="text-sm text-slate-600">
            What would you like to name your journal entry? Don&apos;t worry you can change this later!
            </p>
            <Form {...form}>
                <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-8"
                >
                    <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Entry title
                            </FormLabel>
                            <FormControl>
                                <Input
                                disabled={isSubmitting}
                                placeholder="e.g. &apos;Journal Entry #12&apos;"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                    </form>

            </Form>
        </div>
    );
}

export default NameEntry;