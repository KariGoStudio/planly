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
    title: "Watch something",
    emoji: "🍿",
    tagline: "Pick a film and get comfy",
    gradient: "from-violet-500 to-purple-700",
    forMoods: ["cozy", "relaxed", "cheap"],
  },
  {
    id: "order-food",
    title: "Order food",
    emoji: "🍕",
    tagline: "Let someone else cook tonight",
    gradient: "from-orange-400 to-red-500",
    forMoods: ["cozy", "cheap", "spontaneous"],
  },
  {
    id: "stay-in",
    title: "Stay in together",
    emoji: "🛋️",
    tagline: "Home is enough when you're together",
    gradient: "from-amber-400 to-orange-500",
    forMoods: ["cozy", "relaxed", "romantic"],
  },
  {
    id: "dinner-date",
    title: "Dinner date",
    emoji: "🍷",
    tagline: "Go somewhere worth dressing up for",
    gradient: "from-rose-500 to-pink-700",
    forMoods: ["romantic", "social"],
  },
  {
    id: "nightout",
    title: "Night out",
    emoji: "🌃",
    tagline: "Cocktails, music, good energy",
    gradient: "from-indigo-500 to-blue-700",
    forMoods: ["romantic", "adventurous", "social"],
  },
  {
    id: "activities",
    title: "Activities",
    emoji: "🎳",
    tagline: "Something to actually do",
    gradient: "from-emerald-400 to-teal-600",
    forMoods: ["social", "adventurous", "spontaneous"],
  },
  {
    id: "outdoors",
    title: "Go outside",
    emoji: "🌿",
    tagline: "Fresh air, no agenda",
    gradient: "from-green-500 to-emerald-700",
    forMoods: ["adventurous", "relaxed", "cheap"],
  },
  {
    id: "creative",
    title: "Creative evening",
    emoji: "🎨",
    tagline: "Try something you haven't done before",
    gradient: "from-blue-500 to-indigo-700",
    forMoods: ["creative", "adventurous"],
  },
];

export function getRecommendedCategories(moodIds: string[]): PlanCategory[] {
  if (moodIds.length === 0) return CATEGORIES;

  const scored = CATEGORIES.map((cat) => ({
    cat,
    score: cat.forMoods.filter((m) => moodIds.includes(m)).length,
  })).filter(({ score }) => score > 0);

  if (scored.length === 0) return CATEGORIES;

  return scored.sort((a, b) => b.score - a.score).map(({ cat }) => cat);
}

export function getVibeMessage(
  moodIds: string[]
): { emoji: string; headline: string; subline: string } | null {
  if (moodIds.length === 0) return null;
  if (moodIds.includes("romantic") && moodIds.includes("cozy"))
    return { emoji: "🕯️", headline: "Tonight feels intimate", subline: "Soft lighting, no rushing. Just you two." };
  if (moodIds.includes("romantic"))
    return { emoji: "✨", headline: "Make it special tonight", subline: "The kind of evening you'll want to remember." };
  if (moodIds.includes("adventurous") && moodIds.includes("spontaneous"))
    return { emoji: "⚡", headline: "No plan? That's the plan", subline: "Pick something random and just go." };
  if (moodIds.includes("adventurous"))
    return { emoji: "🔥", headline: "Push the comfort zone tonight", subline: "Try something neither of you would pick alone." };
  if (moodIds.includes("cozy") && moodIds.includes("relaxed"))
    return { emoji: "☁️", headline: "The softest kind of evening", subline: "Slow down. Nothing needs to happen tonight." };
  if (moodIds.includes("cozy"))
    return { emoji: "🧸", headline: "Stay soft tonight", subline: "No plans, no pressure. Just warm and together." };
  if (moodIds.includes("social"))
    return { emoji: "🎉", headline: "Time to be out in the world", subline: "Energy high. You two are going somewhere." };
  if (moodIds.includes("creative"))
    return { emoji: "🎨", headline: "Get weird with it", subline: "Do something you can't do alone." };
  if (moodIds.includes("cheap"))
    return { emoji: "💸", headline: "Great night, zero guilt", subline: "Free or near-free options that actually slap." };
  if (moodIds.includes("relaxed"))
    return { emoji: "🌿", headline: "Easy does it tonight", subline: "Low stakes, high comfort. The best combo." };
  return { emoji: "💛", headline: "Let's find your plan", subline: "Something good is about to happen." };
}

export function getMoodMatchCopy(categoryId: string, moodIds: string[]): string | null {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  if (!cat) return null;
  const matching = cat.forMoods.filter((m) => moodIds.includes(m));
  if (matching.length === 0) return null;

  const copy: Record<string, Partial<Record<string, string>>> = {
    "watch-movie": { cozy: "Perfect cozy night in", romantic: "Great film for two", relaxed: "Zero effort required", cheap: "Free from your sofa" },
    "order-food": { cozy: "No cooking tonight", cheap: "Budget-friendly eats", spontaneous: "Decide in 5 minutes", relaxed: "Let someone else handle it" },
    "stay-in": { cozy: "Home is the vibe tonight", relaxed: "No shoes required", romantic: "Just you two, nowhere to be" },
    "dinner-date": { romantic: "An evening worth dressing for", social: "Make a reservation. Go properly." },
    "nightout": { romantic: "Cocktails and good company", adventurous: "The night has no plan yet", social: "Get out there" },
    "activities": { social: "Actually do something", adventurous: "Commit to the plan", spontaneous: "Show up and figure it out" },
    "outdoors": { adventurous: "Fresh air, no agenda", relaxed: "The world is free tonight", cheap: "Zero cost, maximum reward" },
    "creative": { creative: "Do something you'll remember", adventurous: "Out of your comfort zone" },
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
    { label: "Order food to go with it", categoryId: "order-food" },
    { label: "More cozy stay-in ideas", categoryId: "stay-in" },
  ],
  "order-food": [
    { label: "Pick a film to watch", categoryId: "watch-movie" },
    { label: "More cozy stay-in ideas", categoryId: "stay-in" },
  ],
  "stay-in": [
    { label: "Add a film to the night", categoryId: "watch-movie" },
    { label: "Order food to go with it", categoryId: "order-food" },
  ],
  "dinner-date": [
    { label: "Continue the evening", categoryId: "nightout" },
    { label: "Something to do after dinner", categoryId: "activities" },
  ],
  "nightout": [
    { label: "Start with dinner first", categoryId: "dinner-date" },
    { label: "Do something fun tonight", categoryId: "activities" },
  ],
  "activities": [
    { label: "Dinner before or after", categoryId: "dinner-date" },
    { label: "Drinks to wrap the night", categoryId: "nightout" },
  ],
  "outdoors": [
    { label: "Food after the fresh air", categoryId: "order-food" },
    { label: "Something more to do", categoryId: "activities" },
  ],
  "creative": [
    { label: "Dinner date after", categoryId: "dinner-date" },
    { label: "Drinks to celebrate", categoryId: "nightout" },
  ],
};
