import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Get the last entry with related skills
        const lastEntry = await db.entry.findFirst({
            where: {
                userId: userId,
                isDraft: false, // Only get published entries
            },
            orderBy: {
                createdAt: 'desc', // Get the most recent entry
            },
            include: {
                entrySkills: {
                    include: {
                        skill: true, // Include the skill data
                    },
                },
            },
        });

        if (!lastEntry) {
            return NextResponse.json({ message: "No entries found" }, { status: 404 });
        }

        return NextResponse.json(lastEntry);
    } catch (error) {
        console.log("[GET_LAST_ENTRY]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}