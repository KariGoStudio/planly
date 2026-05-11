"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function JoinCouplePage() {
  const router = useRouter();
  const [status, setStatus] = useState<"joining" | "success" | "error">("joining");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("dev_couple");
    if (!stored) {
      setErrorMsg("No couple found. Create one first.");
      setStatus("error");
      return;
    }
    const couple = JSON.parse(stored);
    localStorage.setItem("dev_couple", JSON.stringify({ ...couple, joined: true }));
    setStatus("success");
    setTimeout(() => router.push("/mood"), 1500);
  }, [router]);

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm text-center animate-slide-up">
        {status === "joining" && (
          <>
            <div className="text-5xl mb-4 animate-pulse">🔗</div>
            <h1 className="text-xl font-semibold text-gray-800">Joining your couple...</h1>
          </>
        )}
        {status === "success" && (
          <>
            <div className="text-5xl mb-4 animate-pop-in">💛</div>
            <h1 className="text-xl font-semibold text-gray-800">You&apos;re connected!</h1>
            <p className="text-gray-400 text-sm mt-2">Let&apos;s go find something fun...</p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="text-5xl mb-4">😕</div>
            <h1 className="text-xl font-semibold text-gray-800">Hmm, that didn&apos;t work</h1>
            <p className="text-gray-400 text-sm mt-2">{errorMsg}</p>
            <button
              onClick={() => router.push("/couple")}
              className="mt-6 px-6 py-3 rounded-2xl bg-coral text-white font-semibold active:scale-95 transition-all"
            >
              Back to couple page
            </button>
          </>
        )}
      </div>
    </div>
  );
}
