"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MOODS } from "@/lib/moods";
import {
  CATEGORIES,
  getRecommendedCategories,
  getVibeMessage,
  getMoodMatchCopy,
  type PlanCategory,
} from "@/lib/categories";
import { requireDevAccess } from "@/lib/dev";
import { getPersonalizedHint } from "@/lib/memory";

function getHeroGradient(moodIds: string[]): string {
  if (moodIds.includes("romantic")) return "from-rose-500 to-pink-700";
  if (moodIds.includes("adventurous") || moodIds.includes("spontaneous"))
    return "from-orange-500 to-red-600";
  if (moodIds.includes("cozy")) return "from-amber-400 to-orange-500";
  if (moodIds.includes("social")) return "from-violet-500 to-purple-700";
  if (moodIds.includes("creative")) return "from-blue-500 to-indigo-700";
  if (moodIds.includes("relaxed")) return "from-teal-400 to-emerald-600";
  if (moodIds.includes("cheap")) return "from-emerald-400 to-green-600";
  return "from-orange-400 to-rose-500";
}

function applyFilterBoost(
  categories: PlanCategory[],
  location: string | null,
  budget: string | null,
  energy: string | null
): PlanCategory[] {
  if (!location && !budget && !energy) return categories;
  const homeIds = new Set(["watch-movie", "order-food", "stay-in", "creative"]);
  const outIds = new Set(["dinner-date", "nightout", "activities", "outdoors"]);
  const freeIds = new Set(["watch-movie", "stay-in", "outdoors"]);
  const splurgeIds = new Set(["dinner-date", "nightout"]);
  const lowEnergyIds = new Set(["watch-movie", "order-food", "stay-in"]);
  const highEnergyIds = new Set(["activities", "nightout", "outdoors"]);

  return categories
    .map((cat) => {
      let boost = 0;
      if (location === "home" && homeIds.has(cat.id)) boost += 2;
      if (location === "out" && outIds.has(cat.id)) boost += 2;
      if (budget === "free" && freeIds.has(cat.id)) boost += 1;
      if (budget === "splurge" && splurgeIds.has(cat.id)) boost += 1;
      if (energy === "low" && lowEnergyIds.has(cat.id)) boost += 1;
      if (energy === "high" && highEnergyIds.has(cat.id)) boost += 1;
      return { cat, boost };
    })
    .sort((a, b) => b.boost - a.boost)
    .map(({ cat }) => cat);
}

const BUDGET_LABELS: Record<string, string> = {
  free: "💸 Free / Cheap",
  medium: "💰 Normal spend",
  splurge: "🤑 Splurging",
};
const LOCATION_LABELS: Record<string, string> = {
  home: "🏠 Staying home",
  out: "🚗 Going out",
};
const TIME_LABELS: Record<string, string> = {
  quick: "⚡ Quick",
  normal: "🕐 Few hours",
  night: "🌙 All night",
};
const ENERGY_LABELS: Record<string, string> = {
  low: "😴 Low key",
  high: "🔥 High energy",
};

function CategoriesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const moodParam = searchParams.get("moods") ?? "";
  const budget = searchParams.get("budget");
  const location = searchParams.get("location");
  const time = searchParams.get("time");
  const energy = searchParams.get("energy");

  const selectedMoodIds = moodParam ? moodParam.split(",") : [];
  const moodSuggested = getRecommendedCategories(selectedMoodIds);
  const suggested = applyFilterBoost(moodSuggested, location, budget, energy);
  const remaining = CATEGORIES.filter(
    (c) => !moodSuggested.some((s) => s.id === c.id)
  );

  const selectedMoods = MOODS.filter((m) => selectedMoodIds.includes(m.id));
  const vibe = getVibeMessage(selectedMoodIds);
  const personalizedHint = getPersonalizedHint(selectedMoodIds);
  const heroGradient = getHeroGradient(selectedMoodIds);

  const filterPills = [
    budget ? BUDGET_LABELS[budget] : null,
    location ? LOCATION_LABELS[location] : null,
    time ? TIME_LABELS[time] : null,
    energy ? ENERGY_LABELS[energy] : null,
  ].filter(Boolean) as string[];

  useEffect(() => {
    requireDevAccess(router);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-rose-50 flex flex-col px-5">

      {/* Header */}
      <div className="pt-12 pb-4">
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-400 font-medium mb-4 flex items-center gap-1 active:opacity-60 transition-opacity"
        >
          ← Back
        </button>
      </div>

      {/* Shared Vibe Hero */}
      {vibe && (
        <div
          className={`relative overflow-hidden rounded-3xl mb-5 bg-gradient-to-br ${heroGradient} p-6 shadow-lg`}
        >
          {/* Background emoji decoration */}
          <div className="absolute -right-4 -bottom-6 text-[90px] opacity-15 pointer-events-none select-none leading-none">
            {vibe.emoji}
          </div>

          <p className="text-white/70 text-[11px] font-bold tracking-[0.15em] uppercase mb-2">
            ✨ Shared vibe tonight
          </p>

          <h2 className="text-[22px] font-black text-white leading-tight">
            {vibe.headline}
          </h2>

          <p className="text-white/75 text-sm mt-1.5 leading-relaxed max-w-[260px]">
            {vibe.subline}
          </p>

          {/* Mood pills */}
          {selectedMoods.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {selectedMoods.map((m) => (
                <span
                  key={m.id}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/20 rounded-full text-white/90 text-xs font-semibold"
                >
                  {m.emoji} {m.label}
                </span>
              ))}
            </div>
          )}

          {/* Filter context pills */}
          {filterPills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {filterPills.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center px-2.5 py-1 bg-white/15 rounded-full text-white/80 text-xs font-medium"
                >
                  {label}
                </span>
              ))}
            </div>
          )}

          {/* Personalized hint */}
          {personalizedHint && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 rounded-full">
              <span className="text-[11px] text-white/90 font-bold">
                ✨ Matches your usual vibe
              </span>
            </div>
          )}
        </div>
      )}

      {/* Recommended categories */}
      <div className="space-y-2.5 pb-4">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
          What sounds good tonight
        </p>
        {suggested.map((cat, i) => {
          const matchCopy = getMoodMatchCopy(cat.id, selectedMoodIds);
          return (
            <button
              key={cat.id}
              onClick={() => router.push(`/swipe?category=${cat.id}`)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl text-left bg-white shadow-sm border border-gray-100/50 hover:shadow-md active:scale-[0.98] transition-all duration-150"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-2xl flex-shrink-0 shadow-sm`}
              >
                {cat.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-800">{cat.title}</p>
                <p className="text-gray-400 text-sm mt-0.5 truncate">
                  {matchCopy ?? cat.tagline}
                </p>
              </div>
              <span className="text-gray-300 font-medium">→</span>
            </button>
          );
        })}
      </div>

      {/* Other options */}
      {remaining.length > 0 && (
        <div className="pb-10">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
            Or try something else
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {remaining.map((cat) => (
              <button
                key={cat.id}
                onClick={() => router.push(`/swipe?category=${cat.id}`)}
                className={`relative overflow-hidden rounded-2xl p-4 text-left bg-gradient-to-br ${cat.gradient} shadow-sm active:scale-[0.97] transition-all duration-150`}
              >
                <div className="text-3xl mb-2 select-none">{cat.emoji}</div>
                <p className="font-bold text-white text-sm leading-tight">
                  {cat.title}
                </p>
                <div className="absolute -right-3 -bottom-3 w-14 h-14 rounded-full bg-white/10 pointer-events-none" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-rose-50 flex items-center justify-center">
          <div className="text-3xl animate-bounce-slow">💛</div>
        </div>
      }
    >
      <CategoriesContent />
    </Suspense>
  );
}
