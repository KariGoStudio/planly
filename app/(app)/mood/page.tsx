"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MOODS } from "@/lib/moods";
import { requireDevAccess } from "@/lib/dev";
import { trackMoods, getStreak } from "@/lib/memory";
import MoodCard from "@/components/MoodCard";

type BudgetFilter = "free" | "medium" | "splurge";
type LocationFilter = "home" | "out";
type TimeFilter = "quick" | "normal" | "night";
type EnergyFilter = "low" | "high";

export default function MoodPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [budget, setBudget] = useState<BudgetFilter | null>(null);
  const [location, setLocation] = useState<LocationFilter | null>(null);
  const [time, setTime] = useState<TimeFilter | null>(null);
  const [energy, setEnergy] = useState<EnergyFilter | null>(null);

  useEffect(() => {
    requireDevAccess(router);
    setStreak(getStreak());
  }, [router]);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  }

  function handleContinue() {
    if (selected.length === 0) return;
    trackMoods(selected);
    const params = new URLSearchParams();
    params.set("moods", selected.join(","));
    if (budget) params.set("budget", budget);
    if (location) params.set("location", location);
    if (time) params.set("time", time);
    if (energy) params.set("energy", energy);
    router.push(`/categories?${params.toString()}`);
  }

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-b from-orange-50 to-rose-50">
      <div className="min-h-full flex flex-col px-5">

        {/* Header */}
        <div className="pt-14 pb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-3xl select-none">💛</p>
            {streak > 0 && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 rounded-full text-orange-600 text-xs font-bold">
                🔥 {streak} day{streak > 1 ? "s" : ""} in a row
              </span>
            )}
          </div>
          <h1 className="text-[28px] font-bold text-gray-800 leading-tight tracking-tight">
            How are you two feeling tonight?
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Pick one or more — we&apos;ll find what fits.
          </p>
        </div>

        {/* Mood grid */}
        <div className="grid grid-cols-2 gap-2.5 pb-5">
          {MOODS.map((mood) => (
            <MoodCard
              key={mood.id}
              mood={mood}
              selected={selected.includes(mood.id)}
              onToggle={() => toggle(mood.id)}
            />
          ))}
        </div>

        {/* Quick Filters — slide in when moods are selected */}
        {selected.length > 0 && (
          <div className="pb-5 space-y-4 animate-slide-up">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest shrink-0">
                Quick filters
              </p>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <p className="text-xs text-gray-500 font-medium">💸 Budget</p>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: "free" as BudgetFilter, label: "Free / Cheap" },
                    { id: "medium" as BudgetFilter, label: "Normal spend" },
                    { id: "splurge" as BudgetFilter, label: "Splurging 🤑" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setBudget(budget === opt.id ? null : opt.id)}
                    className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                      budget === opt.id
                        ? "bg-gray-800 text-white shadow-sm"
                        : "bg-white text-gray-600 border border-gray-200/80"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <p className="text-xs text-gray-500 font-medium">📍 Where</p>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: "home" as LocationFilter, label: "🏠 Staying home" },
                    { id: "out" as LocationFilter, label: "🚗 Going out" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() =>
                      setLocation(location === opt.id ? null : opt.id)
                    }
                    className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                      location === opt.id
                        ? "bg-gray-800 text-white shadow-sm"
                        : "bg-white text-gray-600 border border-gray-200/80"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time */}
            <div className="space-y-2">
              <p className="text-xs text-gray-500 font-medium">⏱ Time available</p>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: "quick" as TimeFilter, label: "⚡ Quick" },
                    { id: "normal" as TimeFilter, label: "🕐 A few hours" },
                    { id: "night" as TimeFilter, label: "🌙 All night" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setTime(time === opt.id ? null : opt.id)}
                    className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                      time === opt.id
                        ? "bg-gray-800 text-white shadow-sm"
                        : "bg-white text-gray-600 border border-gray-200/80"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Energy */}
            <div className="space-y-2">
              <p className="text-xs text-gray-500 font-medium">⚡ Energy level</p>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: "low" as EnergyFilter, label: "😴 Low key" },
                    { id: "high" as EnergyFilter, label: "🔥 High energy" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setEnergy(energy === opt.id ? null : opt.id)}
                    className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                      energy === opt.id
                        ? "bg-gray-800 text-white shadow-sm"
                        : "bg-white text-gray-600 border border-gray-200/80"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Spacer to push CTA down */}
        <div className="flex-1" />

        {/* CTA — sticks to bottom while content scrolls */}
        <div className="sticky bottom-0 py-5 pb-8 bg-gradient-to-t from-rose-50 via-rose-50 to-transparent">
          <button
            onClick={handleContinue}
            disabled={selected.length === 0}
            className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-200 ${
              selected.length > 0
                ? "bg-gray-800 text-white shadow-sm active:scale-[0.97]"
                : "bg-gray-200/80 text-gray-400 cursor-not-allowed"
            }`}
          >
            {selected.length === 0
              ? "Pick a mood to continue"
              : "See tonight’s vibe →"}
          </button>

          {selected.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
              {selected.map((id) => {
                const m = MOODS.find((mood) => mood.id === id)!;
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-white rounded-full text-xs font-medium text-gray-600 shadow-sm"
                  >
                    {m.emoji} {m.label}
                  </span>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
