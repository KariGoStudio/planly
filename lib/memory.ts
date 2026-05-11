const MEM_KEY = "planly_memory";
const SESSION_KEY = "planly_session";

interface MemoryEntry {
  date: string;
  moods: string[];
  categories: string[];
  matches: string[];
}

interface CoupleMemory {
  entries: MemoryEntry[];
}

function getMemory(): CoupleMemory {
  if (typeof window === "undefined") return { entries: [] };
  try {
    return JSON.parse(localStorage.getItem(MEM_KEY) || '{"entries":[]}');
  } catch {
    return { entries: [] };
  }
}

function saveMemory(mem: CoupleMemory) {
  localStorage.setItem(MEM_KEY, JSON.stringify(mem));
}

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function getOrCreateToday(mem: CoupleMemory): MemoryEntry {
  const today = todayStr();
  let entry = mem.entries.find((e) => e.date === today);
  if (!entry) {
    entry = { date: today, moods: [], categories: [], matches: [] };
    mem.entries.push(entry);
  }
  return entry;
}

export function trackMoods(moodIds: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify({ moods: moodIds }));
  const mem = getMemory();
  const entry = getOrCreateToday(mem);
  entry.moods = [...new Set([...entry.moods, ...moodIds])];
  saveMemory(mem);
}

export function trackCategory(categoryId: string) {
  if (typeof window === "undefined") return;
  const mem = getMemory();
  const entry = getOrCreateToday(mem);
  if (!entry.categories.includes(categoryId)) entry.categories.push(categoryId);
  saveMemory(mem);
}

export function trackMatch(itemId: string) {
  if (typeof window === "undefined") return;
  const mem = getMemory();
  const entry = getOrCreateToday(mem);
  if (!entry.matches.includes(itemId)) entry.matches.push(itemId);
  saveMemory(mem);
}

export function getStreak(): number {
  if (typeof window === "undefined") return 0;
  const mem = getMemory();
  if (mem.entries.length === 0) return 0;

  const dates = [...new Set(mem.entries.map((e) => e.date))].sort().reverse();
  const today = todayStr();

  if (dates[0] !== today) return 0;

  let streak = 1;
  const check = new Date();
  check.setDate(check.getDate() - 1);

  for (let i = 1; i < dates.length; i++) {
    if (dates[i] === check.toISOString().split("T")[0]) {
      streak++;
      check.setDate(check.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

export function getTopMoods(): string[] {
  if (typeof window === "undefined") return [];
  const mem = getMemory();
  const counts: Record<string, number> = {};
  mem.entries.forEach((e) =>
    e.moods.forEach((m) => {
      counts[m] = (counts[m] || 0) + 1;
    })
  );
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([mood]) => mood);
}

export function getSessionMoods(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const s = JSON.parse(localStorage.getItem(SESSION_KEY) || "{}");
    return Array.isArray(s.moods) ? s.moods : [];
  } catch {
    return [];
  }
}

export function getPersonalizedHint(moodIds: string[]): string | null {
  const top = getTopMoods();
  if (top.length === 0) return null;
  const overlap = moodIds.filter((m) => top.includes(m));
  if (overlap.length === 0) return null;
  return "Matches your usual vibe";
}
