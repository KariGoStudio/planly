"use client";

import { useMemo } from "react";

const COLORS = [
  "#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF",
  "#FF6FC8", "#FF9F1C", "#A855F7", "#34D399",
];

export default function Confetti() {
  const particles = useMemo(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.8,
        duration: 1.8 + Math.random() * 1.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 5 + Math.floor(Math.random() * 7),
        rotation: Math.floor(Math.random() * 360),
        isCircle: Math.random() > 0.5,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute animate-confetti-fall ${p.isCircle ? "rounded-full" : "rounded-sm"}`}
          style={{
            left: `${p.left}%`,
            top: "-12px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
