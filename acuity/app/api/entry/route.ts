import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
        const { userId } = await auth();
        const { title, skills } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Create the entry first
        const entry = await db.entry.create({
            data: {
                userId,
                title,
                isDraft: true
            }
        });

        // Create or connect skills and create EntrySkill connections
        if (skills && skills.length > 0) {
            for (const skillName of skills) {
                // Get or create the skill
                let skill = await db.skill.findUnique({
                    where: { name: skillName }
                });
                
                if (!skill) {
                    skill = await db.skill.create({
                        data: { name: skillName }
                    });
                }
                
                // Create the EntrySkill connection
                await db.entrySkill.create({
                    data: {
                        entryId: entry.id,
                        skillId: skill.id,
                        confidence: 1 // Default confidence value
                    }
                });
            }
        }

        return NextResponse.json(entry);
    } catch (error) {
        console.log("[ENTRY]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}