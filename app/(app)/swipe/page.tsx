"use client";

import { useMemo, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { ITEMS, CategoryId } from "@/lib/data";
import { CATEGORIES } from "@/lib/categories";
import SwipeCard from "@/components/SwipeCard";
import { saveSwipe, saveMatch } from "@/lib/store";

function SwipeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("SwipePage");

  const categoryId = (searchParams.get("category") || "watch-movie") as CategoryId;

  const items = useMemo(() => ITEMS[categoryId] ?? [], [categoryId]);
  const category = CATEGORIES.find((c) => c.id === categoryId);

  const [index, setIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const done = index >= items.length;

  const handleSwipe = useCallback(
    (direction: "like" | "dislike") => {
      if (isLocked || index >= items.length) return;

      const item = items[index];

      saveSwipe({
        user: "A",
        category: categoryId,
        itemId: item.id,
        value: direction
      });

      if (direction === "dislike") {
        setIndex((i) => i + 1);
        return;
      }

      setIsLocked(true);

      const isMatch = Math.random() < 0.55;

      setTimeout(() => {
        if (isMatch) {
          saveSwipe({
            user: "B",
            category: categoryId,
            itemId: item.id,
            value: "like"
          });

          saveMatch(item);

          router.push(`/match/${item.id}`);
          return;
        }

        setIndex((i) => i + 1);
        setIsLocked(false);
      }, 600);
    },
    [index, items, categoryId, router, isLocked]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-10 pb-4 text-white">
        <button
          onClick={() => router.back()}
          className="opacity-70 active:opacity-40 transition-opacity"
        >
          ← {t("back")}
        </button>

        <div className="flex items-center gap-2 font-bold">
          <span>{category?.emoji}</span>
          <span>{category?.title}</span>
        </div>

        <Link
          href="/saved"
          className="opacity-70 active:opacity-40 transition-opacity"
        >
          {t("saved")}
        </Link>
      </div>

      <div className="flex-1 relative px-5 pb-10 min-h-0">
        {done ? (
          <div className="flex flex-col items-center justify-center h-full text-center pb-16">
            <div className="text-4xl mb-4">💛</div>
            <p className="text-white/60 text-sm mb-6">
              {t("emptyCategory")}
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setIndex(0);
                    setIsLocked(false);
                    router.push(`/swipe?category=${c.id}`);
                  }}
                  className="px-3 py-1.5 bg-white/10 rounded-full text-sm text-white/70 active:bg-white/20 transition-colors"
                >
                  {c.emoji} {c.title}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative h-full min-h-[70vh]">
            {items.slice(index, index + 3).map((item, i) => (
              <div
                key={item.id}
                className="absolute inset-0 transition-all duration-300"
                style={{
                  zIndex: 10 - i,
                  transform:
                    i === 0
                      ? "scale(1) translateY(0)"
                      : `scale(${1 - i * 0.035}) translateY(${i * -16}px)`,
                  opacity: i === 0 ? 1 : Math.max(0.5 - i * 0.15, 0)
                }}
              >
                <SwipeCard
                  item={item}
                  isTop={i === 0 && !isLocked}
                  onLike={() => handleSwipe("like")}
                  onDislike={() => handleSwipe("dislike")}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SwipePage() {
  const t = useTranslations("SwipePage");

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
          {t("loading")}
        </div>
      }
    >
      <SwipeContent />
    </Suspense>
  );
}