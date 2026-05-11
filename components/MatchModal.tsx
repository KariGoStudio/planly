"use client";

import { useEffect, useState } from "react";
import type { SwipeItem, CategoryId } from "@/lib/data";
import { CATEGORIES, AFTER_MATCH } from "@/lib/categories";
import { useRouter } from "next/navigation";
import Confetti from "@/components/Confetti";

interface Props {
  item: SwipeItem;
  category: CategoryId;
  onKeepSwiping: () => void;
}

export default function MatchModal({ item, category, onKeepSwiping }: Props) {
  const router = useRouter();
  const cat = CATEGORIES.find((c) => c.id === category)!;
  const suggestions = AFTER_MATCH[category] ?? [];
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 3500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/75 backdrop-blur-md">
      {showConfetti && <Confetti />}

      {/* Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${cat.gradient} opacity-25 pointer-events-none`}
      />

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6">

        {/* Match label */}
        <p className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-2 animate-slide-up">
          Tonight&apos;s plan unlocked
        </p>
        <p className="text-white text-3xl font-black mb-6 animate-slide-up">
          It&apos;s a match 💛
        </p>

        {/* Item card */}
        <div
          className={`w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-pop-in bg-gradient-to-br ${item.bg} ring-4 ring-white/20`}
        >
          <div className="p-8 text-center">
            <div className="text-7xl mb-4 select-none animate-bounce-slow">
              {item.emoji}
            </div>
            <h2 className="text-2xl font-bold text-white">{item.title}</h2>
            <p className="text-white/70 text-sm mt-1">{item.subtitle}</p>
            {item.meta && (
              <p className="text-white/50 text-xs mt-0.5 font-medium">{item.meta}</p>
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

        {/* Description */}
        <p className="text-white/60 text-sm mt-5 text-center max-w-[280px] leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Bottom panel */}
      <div className="relative bg-white rounded-t-[2rem] px-6 pt-6 pb-10 shadow-2xl">

        {/* After-match suggestions */}
        {suggestions.length > 0 && (
          <div className="mb-5">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
              Keep the night going
            </p>
            <div className="space-y-2">
              {suggestions.map((s) => {
                const sugCat = CATEGORIES.find((c) => c.id === s.categoryId);
                if (!sugCat) return null;
                return (
                  <button
                    key={s.categoryId}
                    onClick={() => router.push(`/swipe?category=${s.categoryId}`)}
                    className="w-full flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 text-left active:bg-gray-100 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${sugCat.gradient} flex items-center justify-center text-xl flex-shrink-0`}
                    >
                      {sugCat.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-700">{s.label}</p>
                      <p className="text-xs text-gray-400 truncate">{sugCat.tagline}</p>
                    </div>
                    <span className="text-gray-300 text-sm">→</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Primary CTA */}
        <button
          onClick={() => router.push("/mood")}
          className={`w-full py-4 rounded-2xl bg-gradient-to-r ${cat.gradient} text-white font-bold shadow-sm active:scale-[0.98] transition-all`}
        >
          Let&apos;s do this ✓
        </button>

        <button
          onClick={onKeepSwiping}
          className="w-full py-3 rounded-2xl bg-transparent text-gray-400 font-medium text-sm active:opacity-60 transition-opacity mt-2"
        >
          Keep exploring
        </button>
      </div>
    </div>
  );
}
