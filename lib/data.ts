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
      subtitle: "Épica de ciencia ficción",
      description: "Un viaje a través del espacio, el tiempo y el amor.",
      emoji: "🚀",
      tags: ["ciencia ficción", "épica"],
      meta: "2h 49m",
      bg: "from-slate-800 to-indigo-900"
    },
    {
      id: "m2",
      category: "watch-movie",
      title: "La La Land",
      subtitle: "Musical romántico",
      description: "Sueños, amor y desamor en Los Ángeles.",
      emoji: "🌟",
      tags: ["romance", "música"],
      meta: "2h 8m",
      bg: "from-pink-500 to-purple-700"
    },
    {
      id: "m3",
      category: "watch-movie",
      title: "Dune",
      subtitle: "Ciencia ficción épica",
      description: "Un planeta desértico y un destino político.",
      emoji: "🏜️",
      tags: ["épica", "ciencia ficción"],
      meta: "2h 35m",
      bg: "from-orange-600 to-amber-900"
    }
  ],

  "order-food": [
    {
      id: "f1",
      category: "order-food",
      title: "Noche de sushi",
      subtitle: "Fresco y ligero",
      description: "Equilibrio perfecto entre sabor y frescura.",
      emoji: "🍣",
      tags: ["fresco", "ligero"],
      bg: "from-rose-500 to-red-700"
    },
    {
      id: "f2",
      category: "order-food",
      title: "Noche de pizza",
      subtitle: "Clásico reconfortante",
      description: "Queso, calorcito y una apuesta que casi nunca falla.",
      emoji: "🍕",
      tags: ["comfort"],
      bg: "from-orange-500 to-red-600"
    }
  ],

  "dinner-date": [
    {
      id: "d1",
      category: "dinner-date",
      title: "Noche de tapas",
      subtitle: "Compartidlo todo",
      description: "Platos pequeños, conversación grande.",
      emoji: "🫒",
      tags: ["compartir", "romántico"],
      bg: "from-amber-500 to-yellow-700"
    }
  ],

  "stay-in": [],
  nightout: [],
  activities: [],
  outdoors: [],
  creative: []
};

export function getItemsByCategory(categoryId: CategoryId) {
  return ITEMS[categoryId] ?? [];
}