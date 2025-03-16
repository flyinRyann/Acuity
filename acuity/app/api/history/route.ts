import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get query parameters
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "50");
    const page = parseInt(url.searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    // Get all entries with related skills
    const entries = await db.entry.findMany({
      where: {
        userId: userId,
        isDraft: false, // Only get published entries
      },
      orderBy: {
        createdAt: 'desc', // Sort by most recent first
      },
      skip,
      take: limit,
      include: {
        entrySkills: {
          include: {
            skill: true, // Include the skill data
          },
        },
      },
    });

    // Get total count for pagination
    const totalEntries = await db.entry.count({
      where: {
        userId: userId,
        isDraft: false,
      },
    });

    return NextResponse.json({
      entries,
      pagination: {
        total: totalEntries,
        pages: Math.ceil(totalEntries / limit),
        currentPage: page,
        limit
      }
    });
  } catch (error) {
    console.log("[GET_ALL_ENTRIES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}