import GameCard from "@/components/GameCard";

export default function GameGrid({ games = [], limit }) {
  const list = limit ? games.slice(0, limit) : games;
  if (!list.length) return <div className="rounded-[22px] border border-dashed border-white/10 bg-white/[.02] px-6 py-16 text-center text-sm text-white/40">No games matched those filters. Try another platform, category or search.</div>;
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{list.map((game, i) => <div key={game.id} className="animate-fadeUp" style={{ animationDelay: `${Math.min(i, 10) * 35}ms` }}><GameCard game={game} priority={i < 4} /></div>)}</div>;
}
