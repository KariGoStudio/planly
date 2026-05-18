"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getSaved } from "@/lib/store";
import Link from "next/link";

export default function SavedPage() {
  const t = useTranslations("SavedPage");
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    setItems(getSaved());
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>

      {items.length === 0 ? (
        <p className="opacity-60">{t("empty")}</p>
      ) : (
        <div className="grid gap-3">
          {items.map((item) => (
            <div
              key={item.category + "-" + item.id + "-" + Math.random()}
              className="p-4 bg-white/10 rounded-xl"
            >
              <div className="text-xl">{item.emoji}</div>
              <div className="font-bold">{item.title}</div>
              <div className="text-sm opacity-70">{item.subtitle}</div>
            </div>
          ))}
        </div>
      )}

      <Link href="/swipe" className="block mt-6 text-blue-400">
        {t("backToSwipe")}
      </Link>
    </div>
  );
}