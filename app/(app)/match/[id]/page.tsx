"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ITEMS } from "@/lib/data";

export default function MatchPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("MatchPage");
  const id = params.id as string;

  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  const allItems = Object.values(ITEMS).flat();
  const item = allItems.find((i) => i.id === id);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti-fall rounded-sm"
              style={{
                left: `${(i * 19 + 5) % 100}%`,
                top: `-${8 + (i % 4) * 6}px`,
                width: `${8 + (i % 3) * 4}px`,
                height: `${8 + (i % 3) * 4}px`,
                background: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF922B"][i % 5],
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="flex items-center px-5 pt-10 pb-4">
        <button
          onClick={() => router.back()}
          className="opacity-60 text-sm active:opacity-30 transition-opacity"
        >
          ← {t("back")}
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-6">
        <p className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-2">
          {t("planUnlocked")}
        </p>
        <h1 className="text-3xl font-black mb-6">{t("matchTitle")}</h1>

        {item ? (
          <>
            <div className={`w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${item.bg} ring-4 ring-white/20`}>
              <div className="p-8 text-center">
                <div className="text-7xl mb-4 select-none animate-bounce-slow">
                  {item.emoji}
                </div>
                <h2 className="text-2xl font-bold">{item.title}</h2>
                <p className="text-white/70 text-sm mt-1">{item.subtitle}</p>
                {item.meta && (
                  <p className="text-white/50 text-xs mt-0.5">{item.meta}</p>
                )}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/15 text-white/80 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm mt-5 text-center max-w-[280px] leading-relaxed">
              {item.description}
            </p>
          </>
        ) : (
          <p className="text-white/50">{t("itemNotFound")}</p>
        )}
      </div>

      <div className="bg-white rounded-t-[2rem] px-6 pt-6 pb-10 shadow-2xl">
        <button
          onClick={() => router.push("/mood")}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-rose-500 text-gray-900 font-bold shadow-sm active:scale-[0.98] transition-all"
        >
          {t("doThis")}
        </button>
        <button
          onClick={() => router.back()}
          className="w-full py-3 rounded-2xl text-gray-400 font-medium text-sm active:opacity-60 transition-opacity mt-2"
        >
          {t("keepExploring")}
        </button>
      </div>
    </div>
  );
}