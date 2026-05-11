"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { requireDevAccess } from "@/lib/dev";

export default function CouplePage() {
  const router = useRouter();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    requireDevAccess(router);
  }, [router]);

  function createCouple() {
    localStorage.setItem(
      "dev_couple",
      JSON.stringify({ id: "couple-1", user_1: "dev-user-a", user_2: "dev-user-b" })
    );
    setConnected(true);
  }

  function goSolo() {
    localStorage.setItem(
      "dev_couple",
      JSON.stringify({ id: "solo-1", user_1: "dev-user-a" })
    );
    router.push("/mood");
  }

  if (connected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-rose-50 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center animate-pop-in">

          <div className="text-6xl mb-6 select-none">💛🤍</div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            You&apos;re connected!
          </h2>
          <p className="text-gray-400 text-sm mb-10 leading-relaxed">
            Your partner is ready. Time to decide what to do tonight.
          </p>

          <div className="bg-white rounded-3xl p-5 shadow-sm mb-5 text-left space-y-3">
            {[
              { emoji: "💛", label: "You", sub: "dev-user-a" },
              { emoji: "🤍", label: "Partner", sub: "dev-user-b" },
            ].map((u) => (
              <div key={u.label} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-xl">
                  {u.emoji}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-700">{u.label}</p>
                  <p className="text-xs text-gray-400">{u.sub}</p>
                </div>
                <div className="ml-auto w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
            ))}
          </div>

          <button
            onClick={() => router.push("/mood")}
            className="w-full py-4 rounded-2xl bg-gray-800 text-white font-bold shadow-sm active:scale-[0.97] transition-all"
          >
            Let&apos;s decide together →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-rose-50 flex flex-col px-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-sm">

          {/* Hero */}
          <div className="text-center mb-10">
            <div className="text-6xl mb-5 select-none">💛🤍</div>
            <h1 className="text-2xl font-bold text-gray-800 leading-tight mb-2">
              You + someone you like
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Planly works best for two. Connect so you can swipe and match together.
            </p>
          </div>

          {/* Connect card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center text-lg">
                💛
              </div>
              <div>
                <p className="font-bold text-sm text-gray-800">Start together</p>
                <p className="text-xs text-gray-400">Simulate both being connected</p>
              </div>
            </div>
            <button
              onClick={createCouple}
              className="w-full py-3.5 rounded-2xl bg-gray-800 text-white font-bold text-sm active:scale-[0.97] transition-all"
            >
              Connect with partner ✨
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-300 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <button
            onClick={goSolo}
            className="w-full py-3.5 rounded-2xl bg-white border border-gray-100 text-gray-500 font-medium text-sm shadow-sm active:scale-[0.97] transition-all"
          >
            Continue solo for now
          </button>
        </div>
      </div>
    </div>
  );
}
