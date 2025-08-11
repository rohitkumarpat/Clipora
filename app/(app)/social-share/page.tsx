"use client";

import React, { useEffect, useRef, useState } from 'react';
import { CldImage } from 'next-cloudinary';


const socialFormats = {
  "Instagram square (1:1)": {
    width: 1080,
    height: 1080,
    aspectRatio: "1:1"
  },
  "Instagram portrait (4:5)": {
    width: 1080,
    height: 1350,
    aspectRatio: "4:5"
  },
  "Twitter post (16:9)": {
    width: 1600,
    height: 900,
    aspectRatio: "16:9"
  },
  "Twitter header (3:1)": {
    width: 1500,
    height: 500,
    aspectRatio: "3:1"
  },
  "Facebook cover (2.63:1)": {
    width: 820,
    height: 312,
    aspectRatio: "2.63:1"
  }
};

type SocialFormatKey = keyof typeof socialFormats;

export default function Socialshare() {
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormatKey>("Instagram square (1:1)");
  const [isUploading, setIsUploading] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      console.log(data)
      setUploadImage(data.publicid);
    } catch (error) {
      console.error(error);
      alert("Failed to upload the image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (!imageRef.current) return;

    fetch(imageRef.current.src)
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "social-image.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      })
      .catch(err => {
        console.error("Download error:", err);
        alert("Failed to download image.");
      });
  };

  const format = socialFormats[selectedFormat];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Social Media Image Formatter</h1>
        <p className="text-gray-400">Upload, transform, and download your image in various social formats</p>
      </div>

      <div className="flex flex-col items-center gap-6">
        {/* Upload Button */}
        <label className="bg-white text-black px-6 py-2 rounded cursor-pointer hover: btn btn-primary transition">
          {isUploading ? "Uploading..." : "Choose an Image"}
          <input type="file" accept="image/*" onChange={handleFileUpload} hidden />
        </label>

     
        <select
          className="bg-white  hover:btn-primary text-black px-4 py-2 rounded"
          value={selectedFormat}
          onChange={(e) => setSelectedFormat(e.target.value as SocialFormatKey)}
        >
          {Object.keys(socialFormats).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>

        
          {uploadImage && (
            <div className="relative w-full max-w-xl">
              <CldImage
                src={uploadImage} 
                width={format.width}
                height={format.height}
                crop="fill"
                alt="Uploaded Image"
                className="rounded shadow-lg mx-auto"
                ref={imageRef}
              />
            </div>
        )}

       
        {uploadImage && (
          <button
            onClick={handleDownload}
            className="mt-4 bg-green-500 hover:bg-green-600 px-6 py-2 rounded text-white"
          >
            Download Imagee
          </button>
        )}

      </div>
    </div>
  );
}
