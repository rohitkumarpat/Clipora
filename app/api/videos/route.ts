import { prismaclient } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { Video } from '@prisma/client';


export async function GET(req: NextRequest) {

  const {userId} = await auth();
  
  if(!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const videos: Video[] = await prismaclient.video.findMany({
      orderBy: { createdAt: "desc" },
      where: { clerkId:userId } 
    });

    return NextResponse.json( 
      {  videos }, 
      { status: 200 }
    );

  } catch (error) {
    console.error("[VIDEOS_GET]", error);
    
    return NextResponse.json(
      { 
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}