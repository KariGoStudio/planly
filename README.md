# Planly — decide together

A swipe-based couple decision app. Both people swipe on plans, and when you both like the same one → it's a match.

---

## Get running in under 1 hour

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → New Project
2. Copy your **Project URL** and **anon key** from Settings → API

### 2. Set up the database

In the Supabase dashboard → **SQL Editor**, paste and run the contents of `supabase/schema.sql`.

### 3. Configure auth

In Supabase dashboard → **Authentication → Email** → make sure **Enable Email OTP** is on (magic links).

Add your local URL to **Redirect URLs**: `http://localhost:3000/api/auth/callback`

### 4. Set up environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 5. Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 6. (Optional) Seed plans to DB

If you want plans mirrored in Supabase (not needed — app uses static data):

Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`, then:

```bash
npm run seed
```

---

## How it works

1. **Login** with your email → magic link, no password
2. **Create a couple** → share the invite link with your partner
3. **Partner clicks the link** → they join your couple
4. **Both select mood** (tired / energetic / romantic / normal), budget, and location pref
5. **Swipe** → like ❤️ or dislike ✕ plans
6. **Match!** → when you both like the same plan, it's a 💛 Plan Match

---

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add the same env vars in Vercel dashboard → Settings → Environment Variables.

Update Supabase Redirect URLs to include your Vercel URL:
`https://your-app.vercel.app/api/auth/callback`

---

## Project structure

```
app/
  (auth)/login/       Login page (magic link)
  (app)/couple/       Create or join a couple
  (app)/mood/         Mood + budget + location selector
  (app)/swipe/        Swipe interface
  (app)/match/[id]/   Match celebration page
  api/                API routes (couple, swipe)
components/
  SwipeCard.tsx       Draggable swipe card
  MatchModal.tsx      Match celebration modal
lib/
  plans.ts            Static plans data + filter logic
  types.ts            TypeScript types
  supabase/           Supabase client (browser + server)
supabase/
  schema.sql          DB tables + RLS policies
```
