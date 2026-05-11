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
    label: "Cozy",
    emoji: "😴",
    tagline: "Low key, easy night",
    gradient: "from-amber-200 to-orange-300",
    textLight: false,
  },
  {
    id: "romantic",
    label: "Romantic",
    emoji: "✨",
    tagline: "Make it special",
    gradient: "from-rose-400 to-pink-500",
    textLight: true,
  },
  {
    id: "adventurous",
    label: "Adventurous",
    emoji: "🔥",
    tagline: "Try something new",
    gradient: "from-orange-400 to-red-500",
    textLight: true,
  },
  {
    id: "cheap",
    label: "Cheap vibes",
    emoji: "💸",
    tagline: "Keep it budget",
    gradient: "from-emerald-300 to-green-400",
    textLight: false,
  },
  {
    id: "social",
    label: "Social",
    emoji: "🎉",
    tagline: "Lively and fun",
    gradient: "from-violet-400 to-purple-500",
    textLight: true,
  },
  {
    id: "relaxed",
    label: "Relaxed",
    emoji: "🌿",
    tagline: "No stress, no rush",
    gradient: "from-teal-300 to-emerald-400",
    textLight: false,
  },
  {
    id: "creative",
    label: "Creative",
    emoji: "🧠",
    tagline: "Do something different",
    gradient: "from-blue-400 to-indigo-500",
    textLight: true,
  },
  {
    id: "spontaneous",
    label: "Spontaneous",
    emoji: "⚡",
    tagline: "Decide in 5 minutes",
    gradient: "from-yellow-300 to-amber-400",
    textLight: false,
  },
];
