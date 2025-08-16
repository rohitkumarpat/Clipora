"use client";

import { useState } from "react";
import Navbar from "../components/nav";

export default function Themeprovide({ children }: { children: React.ReactNode }) {
  const [darkmode, setdarkmode] = useState(true);

  return (
    <div className={`${darkmode ? "bg-black text-white" : "bg-white text-black"} min-h-screen`}>
      <header className="fixed z-10 w-full">
        <Navbar darkmode={darkmode} setdarkmode={setdarkmode} />
      </header>

      <main className={`pt-24 ${darkmode ? "bg-black text-white" : "bg-white text-white"}`}>
        {children}
      </main>
    </div>
  );
}
