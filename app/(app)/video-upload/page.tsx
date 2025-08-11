"use client"; 


import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios from 'axios';

export default function Video() {
  const route = useRouter();
  const [title, settitle] = useState<string>('');
  const [description, setdescription] = useState<string>('');
  const [isuploading, setisuploading] = useState(false);
  const [alertbox, setalertbox] = useState(false);

  const handlefilebutton = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 70 * 1024 * 1024) {
      setalertbox(true);
      return;
    }

    setisuploading(true);
    const formdata = new FormData();
    formdata.append('title', title);
    formdata.append('file', file);
    formdata.append('description', description);
    formdata.append('originalsize', file.size.toString());

    try {
      const response = await axios.post('/api/video-upload', formdata);

      if (!response.data) {
        throw new Error("upload failed");
      }

      console.log("Upload successful:", response.data);
      route.push('/home');
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setisuploading(false);
    }
  };

  return (
    <div className='flex justify-start flex-col items-center gap-10 min-h-screen pt-20  '>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => settitle(e.target.value)}
        className="input input-bordered input-info w-full max-w-screen-sm"
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setdescription(e.target.value)}
        className="input input-bordered input-info w-full max-w-screen-sm"
      />

      <input
        onChange={handlefilebutton}
        accept='video/*'
        type="file"
        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
      />
   {isuploading &&
 <button className="btn">
  <span className="loading loading-spinner"></span>
   Uploading
</button>
}

    </div>
  );
}
