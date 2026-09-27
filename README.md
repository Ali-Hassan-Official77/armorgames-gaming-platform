# ArmorGames

Premium free-to-play game discovery platform built on the supplied Next.js + FreeToGame architecture.

## Stack
- Next.js 14
- React 18
- Tailwind CSS
- FreeToGame API
- Lucide React
- Framer Motion dependency retained from the original project

## Environment
Create `.env.local` if you want to override the API endpoint:

```env
FREETOGAME_API_BASE=https://www.freetogame.com/api
```

## Run

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
npm start
```

## Routes
- `/` — ArmorGames home / featured games
- `/games` — search, category, platform and sorting
- `/games/[id]` — game details, screenshots and related games
- `/about` — platform information
- `/contact` — contact details
- `/api/games` — server-side FreeToGame proxy
- `/api/games/[id]` — game detail proxy
- `/api/categories` — curated filter options

## Data
Game metadata and artwork are read from the existing FreeToGame API integration. ArmorGames does not fabricate game data.
