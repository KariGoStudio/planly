export interface PlanCategory {
  id: string;
  title: string;
  emoji: string;
  tagline: string;
  gradient: string;
  forMoods: string[];
}

export const CATEGORIES: PlanCategory[] = [
  {
    id: "watch-movie",
    title: "Ver algo",
    emoji: "🍿",
    tagline: "Elegid una peli y poneos cómodos",
    gradient: "from-violet-500 to-purple-700",
    forMoods: ["cozy", "relaxed", "cheap"]
  },
  {
    id: "order-food",
    title: "Pedir comida",
    emoji: "🍕",
    tagline: "Que cocine otra persona hoy",
    gradient: "from-orange-400 to-red-500",
    forMoods: ["cozy", "cheap", "spontaneous"]
  },
  {
    id: "stay-in",
    title: "Quedarse en casa",
    emoji: "🛋️",
    tagline: "Casa, calma y buen plan",
    gradient: "from-amber-400 to-orange-500",
    forMoods: ["cozy", "relaxed", "romantic"]
  },
  {
    id: "dinner-date",
    title: "Cena especial",
    emoji: "🍷",
    tagline: "Un plan para arreglarse un poco",
    gradient: "from-rose-500 to-pink-700",
    forMoods: ["romantic", "social"]
  },
  {
    id: "nightout",
    title: "Salir de noche",
    emoji: "🌃",
    tagline: "Copas, música y buena energía",
    gradient: "from-indigo-500 to-blue-700",
    forMoods: ["romantic", "adventurous", "social"]
  },
  {
    id: "activities",
    title: "Actividades",
    emoji: "🎳",
    tagline: "Algo para hacer de verdad",
    gradient: "from-emerald-400 to-teal-600",
    forMoods: ["social", "adventurous", "spontaneous"]
  },
  {
    id: "outdoors",
    title: "Salir al aire libre",
    emoji: "🌿",
    tagline: "Aire fresco y cero complicaciones",
    gradient: "from-green-500 to-emerald-700",
    forMoods: ["adventurous", "relaxed", "cheap"]
  },
  {
    id: "creative",
    title: "Plan creativo",
    emoji: "🎨",
    tagline: "Probad algo que no soléis hacer",
    gradient: "from-blue-500 to-indigo-700",
    forMoods: ["creative", "adventurous"]
  }
];

export function getRecommendedCategories(moodIds: string[]): PlanCategory[] {
  if (moodIds.length === 0) return CATEGORIES;

  const scored = CATEGORIES.map((cat) => ({
    cat,
    score: cat.forMoods.filter((m) => moodIds.includes(m)).length
  })).filter(({ score }) => score > 0);

  if (scored.length === 0) return CATEGORIES;

  return scored.sort((a, b) => b.score - a.score).map(({ cat }) => cat);
}

export function getVibeMessage(
  moodIds: string[]
): { emoji: string; headline: string; subline: string } | null {
  if (moodIds.length === 0) return null;
  if (moodIds.includes("romantic") && moodIds.includes("cozy"))
    return {
      emoji: "🕯️",
      headline: "Hoy toca algo íntimo",
      subline: "Luz suave, cero prisas y tiempo para vosotros."
    };
  if (moodIds.includes("romantic"))
    return {
      emoji: "✨",
      headline: "Haced que hoy sea especial",
      subline: "Un plan de esos que apetece recordar."
    };
  if (moodIds.includes("adventurous") && moodIds.includes("spontaneous"))
    return {
      emoji: "⚡",
      headline: "¿Sin plan? Ese es el plan",
      subline: "Elegid algo al azar y dejaos llevar."
    };
  if (moodIds.includes("adventurous"))
    return {
      emoji: "🔥",
      headline: "Salid un poco de la zona cómoda",
      subline: "Probad algo que quizá no escogeríais por separado."
    };
  if (moodIds.includes("cozy") && moodIds.includes("relaxed"))
    return {
      emoji: "☁️",
      headline: "Una noche suave y sin presión",
      subline: "Bajad el ritmo. Hoy no hace falta demostrar nada."
    };
  if (moodIds.includes("cozy"))
    return {
      emoji: "🧸",
      headline: "Hoy toca plan cómodo",
      subline: "Sin presión, sin complicaciones. Solo estar bien."
    };
  if (moodIds.includes("social"))
    return {
      emoji: "🎉",
      headline: "Hoy apetece salir al mundo",
      subline: "Hay energía. Algo fuera os puede sentar bien."
    };
  if (moodIds.includes("creative"))
    return {
      emoji: "🎨",
      headline: "Haced algo diferente",
      subline: "Un plan raro, creativo o simplemente nuevo."
    };
  if (moodIds.includes("cheap"))
    return {
      emoji: "💸",
      headline: "Buen plan sin culpa",
      subline: "Opciones gratis o baratas que siguen mereciendo la pena."
    };
  if (moodIds.includes("relaxed"))
    return {
      emoji: "🌿",
      headline: "Hoy, fácil y tranquilo",
      subline: "Poco esfuerzo, mucho confort. Buena combinación."
    };
  return {
    emoji: "💛",
    headline: "Vamos a encontrar vuestro plan",
    subline: "Algo bueno está a punto de salir."
  };
}

export function getMoodMatchCopy(categoryId: string, moodIds: string[]): string | null {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  if (!cat) return null;
  const matching = cat.forMoods.filter((m) => moodIds.includes(m));
  if (matching.length === 0) return null;

  const copy: Record<string, Partial<Record<string, string>>> = {
    "watch-movie": {
      cozy: "Perfecto para sofá y manta",
      romantic: "Una buena peli para dos",
      relaxed: "Cero esfuerzo",
      cheap: "Gratis desde el sofá"
    },
    "order-food": {
      cozy: "Hoy no se cocina",
      cheap: "Comida sin gastar demasiado",
      spontaneous: "Decidid en 5 minutos",
      relaxed: "Que otro se encargue"
    },
    "stay-in": {
      cozy: "Casa es el plan",
      relaxed: "Sin zapatos ni prisas",
      romantic: "Vosotros dos y nada más"
    },
    "dinner-date": {
      romantic: "Una noche para arreglarse",
      social: "Reservad y salid bien"
    },
    nightout: {
      romantic: "Copas y buena compañía",
      adventurous: "La noche aún no tiene guion",
      social: "Salid ahí fuera"
    },
    activities: {
      social: "Haced algo de verdad",
      adventurous: "Comprometeos con el plan",
      spontaneous: "Apareced y ya veréis"
    },
    outdoors: {
      adventurous: "Aire fresco sin agenda",
      relaxed: "El mundo está ahí fuera",
      cheap: "Cero coste, buen resultado"
    },
    creative: {
      creative: "Algo que recordaréis",
      adventurous: "Fuera de lo habitual"
    }
  };

  const catCopy = copy[categoryId] ?? {};
  for (const m of matching) {
    const msg = catCopy[m];
    if (msg) return msg;
  }
  return null;
}

export const AFTER_MATCH: Record<string, { label: string; categoryId: string }[]> = {
  "watch-movie": [
    { label: "Pedir comida para acompañar", categoryId: "order-food" },
    { label: "Más ideas para quedarse en casa", categoryId: "stay-in" }
  ],
  "order-food": [
    { label: "Elegir una peli para ver", categoryId: "watch-movie" },
    { label: "Más ideas para quedarse en casa", categoryId: "stay-in" }
  ],
  "stay-in": [
    { label: "Añadir una peli al plan", categoryId: "watch-movie" },
    { label: "Pedir comida para acompañar", categoryId: "order-food" }
  ],
  "dinner-date": [
    { label: "Continuar la noche", categoryId: "nightout" },
    { label: "Algo para hacer después de cenar", categoryId: "activities" }
  ],
  nightout: [
    { label: "Empezar con una cena", categoryId: "dinner-date" },
    { label: "Hacer algo divertido hoy", categoryId: "activities" }
  ],
  activities: [
    { label: "Cena antes o después", categoryId: "dinner-date" },
    { label: "Copas para cerrar la noche", categoryId: "nightout" }
  ],
  outdoors: [
    { label: "Comida después del aire libre", categoryId: "order-food" },
    { label: "Algo más para hacer", categoryId: "activities" }
  ],
  creative: [
    { label: "Cena después", categoryId: "dinner-date" },
    { label: "Copas para celebrarlo", categoryId: "nightout" }
  ]
};