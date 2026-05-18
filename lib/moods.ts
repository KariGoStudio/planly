export interface Mood {
  id: string;
  label: string;
  emoji: string;
  tagline: string;
  gradient: string;
  textLight: boolean;
}

export const MOODS: Mood[] = [
  {
    id: "cozy",
    label: "Acogedor",
    emoji: "😴",
    tagline: "Noche tranquila y fácil",
    gradient: "from-amber-200 to-orange-300",
    textLight: false
  },
  {
    id: "romantic",
    label: "Romántico",
    emoji: "✨",
    tagline: "Hacedlo especial",
    gradient: "from-rose-400 to-pink-500",
    textLight: true
  },
  {
    id: "adventurous",
    label: "Aventurero",
    emoji: "🔥",
    tagline: "Probad algo nuevo",
    gradient: "from-orange-400 to-red-500",
    textLight: true
  },
  {
    id: "cheap",
    label: "Plan barato",
    emoji: "💸",
    tagline: "Sin gastar demasiado",
    gradient: "from-emerald-300 to-green-400",
    textLight: false
  },
  {
    id: "social",
    label: "Social",
    emoji: "🎉",
    tagline: "Animado y divertido",
    gradient: "from-violet-400 to-purple-500",
    textLight: true
  },
  {
    id: "relaxed",
    label: "Relax",
    emoji: "🌿",
    tagline: "Sin estrés ni prisas",
    gradient: "from-teal-300 to-emerald-400",
    textLight: false
  },
  {
    id: "creative",
    label: "Creativo",
    emoji: "🧠",
    tagline: "Haced algo diferente",
    gradient: "from-blue-400 to-indigo-500",
    textLight: true
  },
  {
    id: "spontaneous",
    label: "Espontáneo",
    emoji: "⚡",
    tagline: "Decidid en 5 minutos",
    gradient: "from-yellow-300 to-amber-400",
    textLight: false
  }
]