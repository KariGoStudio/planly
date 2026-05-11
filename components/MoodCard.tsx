"use client";

import type { Mood } from "@/lib/moods";

interface Props {
  mood: Mood;
  selected: boolean;
  onToggle: () => void;
}

export default function MoodCard({ mood, selected, onToggle }: Props) {
  const darkText = !mood.textLight;

  return (
    <button
      onClick={onToggle}
      className={[
        "relative rounded-2xl p-4 text-left transition-all duration-200 ease-out active:scale-[0.96]",
        selected
          ? `bg-gradient-to-br ${mood.gradient} shadow-lg scale-[1.02]`
          : "bg-white shadow-sm border border-gray-100/80",
      ].join(" ")}
    >
      <div className="text-3xl mb-2 leading-none select-none">{mood.emoji}</div>

      <p
        className={`font-bold text-sm leading-snug ${
          selected
            ? darkText
              ? "text-gray-800"
              : "text-white"
            : "text-gray-700"
        }`}
      >
        {mood.label}
      </p>

      <p
        className={`text-xs mt-0.5 leading-snug ${
          selected
            ? darkText
              ? "text-gray-600"
              : "text-white/75"
            : "text-gray-400"
        }`}
      >
        {mood.tagline}
      </p>

      {selected && (
        <div
          className={`absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
            darkText ? "bg-gray-800/15 text-gray-800" : "bg-white/25 text-white"
          }`}
        >
          ✓
        </div>
      )}
    </button>
  );
}
