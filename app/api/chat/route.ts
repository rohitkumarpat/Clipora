import { prismaclient } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { NextRequest } from "next/server";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

function getCloudinaryUrl(publicId: string, resourceType: string, format: string) {
  return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${publicId}.${format}`;
}

async function getUserUploadInfo(userId: string) {
  const response = await prismaclient.video.findFirst({
    where: {
      clerkId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!response) {
    return null;
  }

  return {
    latestVideo: {
      originalSizeMB: response.originalsize ?? "unknown",
      compressedSizeMB: response.compressed ?? "unknown",
      downloadUrl: getCloudinaryUrl(response.publicid, "video", "mp4"),
    },
    latestImage: {
      resolution: "unknown", 
      downloadUrl: getCloudinaryUrl(response.publicid, "image", "jpg"), 
    },
  };
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const body = await req.json();
  const message = body.message;

  if (!message) {
    return new Response(JSON.stringify({ error: "No message provided" }), { status: 400 });
  }

  const uploadInfo = await getUserUploadInfo(userId);

  if (!uploadInfo) {
    return new Response(
      JSON.stringify({ error: "No uploads found for this user" }),
      { status: 404 }
    );
  }

  const prompt = `
You are a helpful assistant for Clipora, a media optimization platform where users can upload images and videos to get compressed, optimized versions while maintaining quality.

# About Clipora:
- Clipora helps users reduce file sizes of videos and images without significant quality loss
- Key features: 
  * Smart compression algorithms
  * Fast processing
  * Quality preservation
  * Easy sharing/download
- Benefits: Saves storage space, faster uploads/downloads, better performance

# User's Latest Upload Info:
- Latest Video: 
  * Original size: ${uploadInfo.latestVideo.originalSizeMB} MB
  * Compressed size: ${uploadInfo.latestVideo.compressedSizeMB} MB 
  * Compression ratio: ${calculateRatio(uploadInfo.latestVideo.originalSizeMB, uploadInfo.latestVideo.compressedSizeMB)}%
  * Download URL: ${uploadInfo.latestVideo.downloadUrl}
  
- Latest Image:
  * Resolution: ${uploadInfo.latestImage.resolution}
  * Download URL: ${uploadInfo.latestImage.downloadUrl}

# Response Guidelines:
1. For questions about Clipora, explain features and benefits clearly
2. For upload-specific questions, reference the user's data shown above
3. For technical questions, provide knowledgeable answers about media optimization
4. For unrelated questions, politely explain you specialize in Clipora topics
5. Keep responses concise (1-2 paragraphs max)

User question: "${message}"
`;
function calculateRatio(original: string, compressed: string): string {
  if (original === "unknown" || compressed === "unknown") return "unknown";
  const orig = parseFloat(original);
  const comp = parseFloat(compressed);
  return ((1 - comp/orig) * 100).toFixed(2);
}

  try {
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", 
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 300,
      }
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // Get the response text
    const response = await result.response;
    const answer = response.text();

    return new Response(JSON.stringify({ answer }), { status: 200 });
  } catch (error) {
    console.error("Gemini API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get response from AI" }),
      { status: 500 }
    );
  }
}