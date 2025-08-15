"use client";

import { filesize } from "filesize";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Download, Clock, FileUp, FileDown } from "lucide-react";
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";
import { useCallback, useEffect, useState } from "react";
import { Video } from "@prisma/client";


dayjs.extend(relativeTime);

interface videoprops {
  video: Video;
  onDownload: (url: string, title: string) => void;
}

export default function Cardforhome({ video, onDownload }: videoprops) {
  const [ishover, setishover] = useState(false);
  const [previewerror, setpreviewerror] = useState(false);

  const getthumbnailurl = useCallback((publicid: string) => {
    return getCldImageUrl({
      width: 400,
      height: 300,
      src: publicid,
      crop: "fill",
      quality: "auto",
      format: "jpg",
      assetType: "video",
    });
  }, []);

  const getfullvideourl = useCallback((publicid: string) => {
    return getCldVideoUrl({
      width: 1920,
      height: 1080,
      src: publicid,
    });
  }, []);

  const getpreviewvideourl = useCallback((publicid: string) => {
    return getCldVideoUrl({
      width: 400,
      height: 225,
      src: publicid,
      rawTransformations: "e_preview:duration_15:max_seg_9:min_seg_dur_1",
    });
  }, []);

  const formatize = useCallback((size: number) => {
    return filesize(size);
  }, []);

  const formatduration = useCallback((second: number) => {
    const minute = Math.floor(second / 60);
    const remaingsecond = Math.round(second % 60);
    return `${minute}:${remaingsecond.toString().padStart(2, "0")}`;
  }, []);

  const compressionpercentage = Math.round(
    (1 - Number(video.originalsize) / Number(video.compressed)) * 100
  );

  useEffect(() => {
    setpreviewerror(false);
  }, [ishover]);

  const handlepreviewerror = () => {
    setpreviewerror(true);
  };

  return (
    <div className="">
    <div
      className="card bg-gray-900 text-white shadow-lg hover:shadow-2xl rounded-xl 
                 overflow-hidden border border-gray-800 transition-all duration-300 
                 w-full sm:w-80 md:w-96"
      onMouseEnter={() => setishover(true)}
      onMouseLeave={() => setishover(false)}
    >
      <figure className="relative w-full h-56 bg-black">
        {!ishover || previewerror ? (
          <img
            src={getthumbnailurl(video.publicid)}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            src={getpreviewvideourl(video.publicid)}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            onError={handlepreviewerror}
          />
        )}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-lg">
          {formatduration(video.duration || 0)}
        </div>
      </figure>

      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold">{video.title}</h2>
        <p className="text-xs text-gray-400 flex items-center gap-1">
          <Clock size={14} /> {dayjs(video.createdAt).fromNow()}
        </p>

        <div className="mt-3 space-y-1">
          <p className="text-sm flex items-center gap-2">
            <FileUp size={16} className="text-blue-400" />
            <span>Original: {formatize(Number(video.originalsize))}</span>
          </p>
          <p className="text-sm flex items-center gap-2">
            <FileDown size={16} className="text-green-400" />
            <span>
              Compressed: {formatize(Number(video.compressed))}{" "}
              <span className="text-green-500 font-semibold">
                ({compressionpercentage}% smaller)
              </span>
            </span>
          </p>
        </div>

        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-primary btn-sm flex items-center gap-2 bg-blue-600 hover:bg-blue-500 border-none rounded-lg px-4 py-2"
            onClick={() =>
              onDownload(getfullvideourl(video.publicid), video.title)
            }
          >
            <Download size={16} /> Download
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
