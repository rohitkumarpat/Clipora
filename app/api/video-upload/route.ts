import { prismaclient } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { v2 as cloudinary } from 'cloudinary';
import { Quando } from 'next/font/google';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

interface CloudinaryUploadResult {
  public_id: string;
   bytes   :number,
   duration?:number,
  [key: string]: any;
}

export async function POST(req: NextRequest) {

  const { userId }= await auth();

   if(!userId) {
    return NextResponse.json({msg:"unauthorized user"},{status:411})
     }
  try {

    if (!userId) {
    return NextResponse.json({ msg: "unauthorized user" }, { status: 401 });
  }
    
   if(! process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET  ) {
    return NextResponse.json({msg:"incorrect cloud_name,api_key,api_secret"},{status:411})
   }


    const formdata = await req.formData();
    const file = formdata.get("file") as File | null;
    const title=formdata.get('title') as string;
     const description=formdata.get('description') as string;
     const originalsize=formdata.get('originalsize') as string;

    if (!file) {    
      return NextResponse.json({ msg: "file not found" }, { status: 400 });
    }

    const arraybuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arraybuffer);

    const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      const uploadstream = cloudinary.uploader.upload_stream(
        { folder: "Clipora-uploads", resource_type: "auto" ,transformation:[
            {quality:'auto',fetch_format:'mp4'}
        ]},
        (error, result) => {
          if (error) reject(error);
          else resolve(result as CloudinaryUploadResult);
        }
      );
      uploadstream.end(buffer);
    });

    const video=await prismaclient.video.create({
          data:{
            title,
            description,
            publicid:result.public_id,
            compressed:String(result.bytes),
            duration:result.duration|| 0,
            originalsize:originalsize,
            clerkId:userId

          }

    })

   return NextResponse.json({
    video
   })

  } catch (error) {
    console.log("video failed",error);
    return NextResponse.json({ msg: "video server error" }, { status: 500 });
  }
}
