import type { SwipeItem } from "@/lib/data";

const SWIPES_KEY = "swipes";
const SAVED_KEY = "saved_matches";

type SwipeRecord = { user: string; category: string; itemId: string; value: string };

export function saveSwipe(data: SwipeRecord): SwipeRecord[] {
  const prev: SwipeRecord[] = JSON.parse(localStorage.getItem(SWIPES_KEY) || "[]");
  const updated = [...prev, data];
  localStorage.setItem(SWIPES_KEY, JSON.stringify(updated));
  return updated;
}

export function checkMatch(swipes: SwipeRecord[], categoryId: string, itemId: string): boolean {
  const liked = (user: string) =>
    swipes.some(
      (s) => s.user === user && s.category === categoryId && s.itemId === itemId && s.value === "like"
    );
  return liked("A") && liked("B");
}

export function isItemSaved(id: string): boolean {
  const saved: { id: string }[] = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
  return saved.some((i) => i.id === id);
}

export function saveItem(item: SwipeItem): void {
  const prev: SwipeItem[] = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
  if (prev.some((i) => i.id === item.id)) return;
  localStorage.setItem(SAVED_KEY, JSON.stringify([...prev, item]));
}

export function unsaveItem(id: string): void {
  const prev: SwipeItem[] = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
  localStorage.setItem(SAVED_KEY, JSON.stringify(prev.filter((i) => i.id !== id)));
}

export function saveMatch(item: SwipeItem): void {
  saveItem(item);
}

export function getSaved(): SwipeItem[] {
  return JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
}
