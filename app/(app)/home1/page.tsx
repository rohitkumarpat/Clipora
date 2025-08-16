  "use client"


  import Cardforhome from '@/app/components/card'
  import {  Video } from '@prisma/client';
  import axios from 'axios';
  import React, { useEffect, useState, useCallback } from 'react'

  

  interface ChatResponse {
    answer: string;
    error?: string;
  }

  export default function HomeClient() {
    const [videodetail, setvideodetail] = useState<Video[]>([]);
    const [msg, setmsg] = useState<string>("");
    const [messagedisplay, setmessagedisplay] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchingthedata = useCallback(async () => {
      try {
        const response = await axios.get('/api/videos');
        setvideodetail(response.data.videos);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError("failed to fetch the video")
      }
    }, []);

    useEffect(() => {
      fetchingthedata();
      const intervalId = setInterval(fetchingthedata, 50000);
      return () => clearInterval(intervalId);
    }, [fetchingthedata]);

    const handlesubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!msg.trim()) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await axios.post<ChatResponse>('/api/chat', { message: msg });
        setmessagedisplay(response.data.answer || response.data.error || "No response received");
        setmsg(""); 
      } catch (error) {
        console.error('Chat error:', error);
        setError('Failed to get response from AI');
      } finally {
        setIsLoading(false);
      }
    };

    const CHAT_WIDTH = 384;

    return (
      <>
        <div
          className="min-h-screen flex justify-center items-start  p-8 "
          
        >
          <div className="flex flex-col justify-start items-center gap-4 w-full max-w-4xl">
          {Array.isArray(videodetail) && videodetail.length > 0 ? (
  videodetail.map((video) => (
    <Cardforhome
      key={video.publicid}
      video={video}
    />
  ))
) : (
  <p>Loading....</p> 
)}


          </div>
        </div>

        <aside
          className="fixed top-32 right-10 bg-gray-900 rounded-lg shadow-lg p-4 flex flex-col h-4/5"
          style={{ width: CHAT_WIDTH }}
        >
          <h2 className="text-white text-xl font-semibold mb-4">CLIPORA Chat</h2>

          <div className="flex-1 overflow-y-auto mb-4 text-white">
            {error && <p className="text-red-500">{error}</p>}
            {messagedisplay}
            {isLoading && <p>Loading...</p>}
          </div>  

          <form onSubmit={handlesubmit} className="flex gap-2">
            <input
              value={msg}
              type="text"
              onChange={(e) => setmsg(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-lg px-4 py-2 bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 text-white"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="btn btn-primary px-4 py-2 rounded-lg"
              disabled={isLoading || !msg.trim()}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </aside>
      </>
    );
  }