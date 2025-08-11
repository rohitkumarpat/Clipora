import { auth } from '@clerk/nextjs/server';
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

interface CloudinaryUploadResult {
  public_id: string;
  [key: string]: any;
}

export async function POST(req: NextRequest) {
  const user = await auth();

  if (!user) {
    return NextResponse.json({ msg: "unauthorized user" }, { status: 401 });
  }

  try {
    const formdata = await req.formData();
    const file = formdata.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ msg: "file not found" }, { status: 400 });
    }

    const arraybuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arraybuffer);

    const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      const uploadstream = cloudinary.uploader.upload_stream(
        { folder: "Clipora-uploads", resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as CloudinaryUploadResult);
        }
      );
      uploadstream.end(buffer);
    });

    return NextResponse.json({publicid: result.public_id },{status:200});
  } catch (error) {
    console.log("image upload failed",error);
    return NextResponse.json({ msg: "image server error" }, { status: 500 });
  }
}
