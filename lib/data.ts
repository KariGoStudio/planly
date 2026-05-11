export type CategoryId =
  | "watch-movie"
  | "order-food"
  | "stay-in"
  | "dinner-date"
  | "nightout"
  | "activities"
  | "outdoors"
  | "creative";

export interface SwipeItem {
  id: string;
  category: CategoryId;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  tags: string[];
  meta?: string;
  bg: string;
}

export const ITEMS: Record<CategoryId, SwipeItem[]> = {
  "watch-movie": [
    {
      id: "m1",
      category: "watch-movie",
      title: "Interstellar",
      subtitle: "Sci-Fi Epic",
      description: "A journey through space, time and love.",
      emoji: "🚀",
      tags: ["sci-fi", "epic"],
      meta: "2h 49m",
      bg: "from-slate-800 to-indigo-900",
    },
    {
      id: "m2",
      category: "watch-movie",
      title: "La La Land",
      subtitle: "Romance Musical",
      description: "Dreams, love and heartbreak in LA.",
      emoji: "🌟",
      tags: ["romance", "music"],
      meta: "2h 8m",
      bg: "from-pink-500 to-purple-700",
    },
    {
      id: "m3",
      category: "watch-movie",
      title: "Dune",
      subtitle: "Epic Sci-Fi",
      description: "A desert planet and political destiny.",
      emoji: "🏜️",
      tags: ["epic", "sci-fi"],
      meta: "2h 35m",
      bg: "from-orange-600 to-amber-900",
    },
  ],

  "order-food": [
    {
      id: "f1",
      category: "order-food",
      title: "Sushi Night",
      subtitle: "Fresh & light",
      description: "Perfect balance of flavor and freshness.",
      emoji: "🍣",
      tags: ["fresh", "light"],
      bg: "from-rose-500 to-red-700",
    },
    {
      id: "f2",
      category: "order-food",
      title: "Pizza Night",
      subtitle: "Classic comfort",
      description: "Cheesy, warm and always right.",
      emoji: "🍕",
      tags: ["comfort"],
      bg: "from-orange-500 to-red-600",
    },
  ],

  "dinner-date": [
    {
      id: "d1",
      category: "dinner-date",
      title: "Tapas Night",
      subtitle: "Share everything",
      description: "Small plates, big conversation.",
      emoji: "🫒",
      tags: ["sharing", "romantic"],
      bg: "from-amber-500 to-yellow-700",
    },
  ],

  "stay-in": [],
  "nightout": [],
  "activities": [],
  "outdoors": [],
  "creative": [],
};

// 🔥 FIX CLAVE
export function getItemsByCategory(categoryId: CategoryId) {
  return ITEMS[categoryId] ?? [];
}