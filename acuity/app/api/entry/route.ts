import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
        const { userId } = await auth();
        const { entryName, selectedSkills, skillRatings, journalEntry } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Validate required data
        if (!entryName) {
            return new NextResponse("Entry name is required", { status: 400 });
        }

        // Create the entry
        const entry = await db.entry.create({
            data: {
                userId,
                title: entryName,
                reflection: journalEntry || null,
                isDraft: false // Set to false if this is a final submission
            }
        });

        // Process selected skills and their ratings
        if (selectedSkills && selectedSkills.length > 0) {
            for (const skillName of selectedSkills) {
                // Get confidence rating for this skill, default to 3 if not specified
                const confidence = skillRatings && skillRatings[skillName] 
                    ? skillRatings[skillName] 
                    : 3;
                
                // Find or create the skill
                let skill = await db.skill.findUnique({
                    where: { name: skillName }
                });
                
                if (!skill) {
                    skill = await db.skill.create({
                        data: { name: skillName }
                    });
                }
                
                // Create the EntrySkill connection with the confidence rating
                await db.entrySkill.create({
                    data: {
                        entryId: entry.id,
                        skillId: skill.id,
                        confidence: confidence
                    }
                });
            }
        }

        return NextResponse.json({
            success: true,
            entry: {
                id: entry.id,
                title: entry.title
            }
        });
    } catch (error) {
        console.log("[JOURNAL_ENTRY_SUBMISSION]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}