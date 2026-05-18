"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import type { SwipeItem } from "@/lib/data";
import { isItemSaved, saveItem, unsaveItem } from "@/lib/store";

interface Props {
  item: SwipeItem;
  onLike: () => void;
  onDislike: () => void;
  onSave?: () => void;
  isTop: boolean;
  moodCopy?: string | null;
}

const CATEGORY_PHOTOS: Record<string, string[]> = {
  "watch-movie": [
    "1489599849927-2ee91cede3ba",
    "1478720568477-152d9b8e9948",
    "1440404653325-ab127d49abc1",
    "1512070679279-8988d32161be",
    "1524985069026-dd778a71c7b4"
  ],
  "order-food": [
    "1565299624946-b28f40a0ae38",
    "1579584425555-c3ce17fd4351",
    "1571091718767-18b5b1457add",
    "1551782386-f6d1a8d22b06",
    "1504674900247-0877df9cc836"
  ],
  "stay-in": [
    "1558618666-fcd25c85cd64",
    "1507048331197-7d4ac70811cf",
    "1484101403633-562f891dc89a",
    "1513635269975-59663e0ac1ad",
    "1493246507139-91e8fad9978e"
  ],
  "dinner-date": [
    "1414235077428-338989a2e8c0",
    "1424847651672-bf20a4b0982b",
    "1559339352-11d035aa65de",
    "1555396273-367ea4eb4db5",
    "1466637574441-749b8f19452f"
  ],
  "nightout": [
    "1516450360452-9312f5e86fc7",
    "1514525253161-7a46d19cd819",
    "1566737236500-c8ac5028fc1d",
    "1574391884720-bbc3740c59d1",
    "1470229538611-16ba8c7ffbd7"
  ],
  activities: [
    "1526401485004-15eb3c919c67",
    "1544551763-46a013bb70d5",
    "1522778119026-a9b179f89a86",
    "1526374965328-7f61d4dc18c5",
    "1504025468112-ff0ef0672703"
  ],
  outdoors: [
    "1441974231531-c6227db76b6e",
    "1506905925346-21bda4d32df4",
    "1472791108553-c9405341e44a",
    "1518611012118-696072aa579a",
    "1501854140801-50d01698950b"
  ],
  creative: [
    "1513475382585-d06e58bcb0e0",
    "1556742049-0cfed4f6a45d",
    "1452802447250-470a88ac82bc",
    "1460661419201-fd4cecdf8a8b",
    "1507676184212-d03ab07a01bf"
  ]
};

function getImageUrl(item: SwipeItem): string {
  const photos = CATEGORY_PHOTOS[item.category];
  if (!photos?.length) return "";
  const num = parseInt(item.id.replace(/\D/g, ""), 10) || 0;
  return `https://images.unsplash.com/photo-${photos[num % photos.length]}?w=500&h=700&fit=crop&q=80`;
}

export default function SwipeCard({
  item,
  onLike,
  onDislike,
  onSave,
  isTop,
  moodCopy
}: Props) {
  const t = useTranslations("SwipeCard");
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-18, 0, 18]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);
  const swipingRef = useRef(false);

  const [swiping, setSwiping] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveAnim, setSaveAnim] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setSaved(isItemSaved(item.id));
    setImgError(false);
    swipingRef.current = false;
    setSwiping(false);
    x.set(0);
  }, [item.id, x]);

  async function animateOut(dir: "left" | "right") {
    if (swipingRef.current) return;
    swipingRef.current = true;
    setSwiping(true);
    await animate(x, dir === "right" ? 700 : -700, {
      duration: 0.3,
      ease: "easeOut"
    });
    if (dir === "right") onLike();
    else onDislike();
  }

  async function handleDragEnd(_: unknown, info: PanInfo) {
    if (swipingRef.current) return;
    if (info.offset.x > 100 || info.velocity.x > 500) {
      await animateOut("right");
    } else if (info.offset.x < -100 || info.velocity.x < -500) {
      await animateOut("left");
    } else {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 28 });
    }
  }

  function handleSave(e: React.MouseEvent) {
    e.stopPropagation();
    if (saved) {
      unsaveItem(item.id);
      setSaved(false);
    } else {
      saveItem(item);
      setSaved(true);
      setSaveAnim(true);
      setTimeout(() => setSaveAnim(false), 500);
      onSave?.();
    }
  }

  const imageUrl = getImageUrl(item);
  const showImage = !!imageUrl && !imgError;

  return (
    <div className="h-full flex flex-col">
      <motion.div
        style={{ x, rotate }}
        drag={isTop && !swiping ? "x" : false}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        className={[
          "relative flex-1 rounded-3xl overflow-hidden shadow-2xl",
          `bg-gradient-to-br ${item.bg}`,
          isTop && !swiping ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
        ].join(" ")}
      >
        {showImage && (
          <img
            src={imageUrl}
            alt=""
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        )}

        {showImage && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15" />
        )}

        <motion.div
          className="absolute top-7 left-5 z-10 px-4 py-1.5 rounded-xl border-[3px] border-green-400 text-green-400 font-black text-lg rotate-[-18deg] pointer-events-none"
          style={{ opacity: likeOpacity }}
        >
          {t("likeStamp")}
        </motion.div>

        <motion.div
          className="absolute top-7 right-5 z-10 px-4 py-1.5 rounded-xl border-[3px] border-red-400 text-red-400 font-black text-lg rotate-[18deg] pointer-events-none"
          style={{ opacity: nopeOpacity }}
        >
          {t("nopeStamp")}
        </motion.div>

        <div className="absolute inset-0 flex flex-col justify-between p-7 pointer-events-none">
          <div className="flex items-start justify-between">
            <div
              className={[
                "select-none leading-none",
                showImage ? "text-5xl mt-2 drop-shadow-lg" : "text-7xl mt-2"
              ].join(" ")}
            >
              {item.emoji}
            </div>
            {moodCopy && (
              <span className="mt-3 px-3 py-1.5 rounded-full bg-white/20 text-white/90 text-xs font-semibold backdrop-blur-sm">
                {moodCopy}
              </span>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white leading-tight drop-shadow">
              {item.title}
            </h2>
            <p className="text-white/70 text-sm mt-1">{item.subtitle}</p>
            {item.meta && (
              <p className="text-white/50 text-xs mt-0.5 font-medium">
                {item.meta}
              </p>
            )}
            <p className="text-white/85 text-sm mt-3 leading-relaxed line-clamp-2 drop-shadow">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white/15 text-white/85 text-xs font-medium backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {isTop && (
        <div className="flex justify-center items-center gap-4 pt-5 pb-2">
          <button
            onClick={() => animateOut("left")}
            className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-xl hover:scale-110 active:scale-95 transition-transform border border-gray-100 text-gray-400 font-bold"
            aria-label={t("dislike")}
          >
            ✕
          </button>

          <button
            onClick={handleSave}
            className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-xl transition-all hover:scale-110 active:scale-95 border ${
              saved ? "bg-amber-400 border-amber-300 text-white" : "bg-white border-gray-100 text-gray-400"
            } ${saveAnim ? "animate-star-pop" : ""}`}
            aria-label={saved ? t("unsave") : t("saveForLater")}
          >
            {saved ? "⭐" : "☆"}
          </button>

          <button
            onClick={() => animateOut("right")}
            className="w-20 h-20 rounded-full bg-coral shadow-lg flex items-center justify-center text-2xl hover:scale-110 active:scale-95 transition-transform"
            aria-label={t("like")}
          >
            ❤️
          </button>
        </div>
      )}
    </div>
  );
}