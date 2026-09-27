import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Building2, CalendarDays, Cpu, ExternalLink, Globe2, Monitor, Tag, UserRound } from "lucide-react";
import { notFound } from "next/navigation";
import { freeToGameFetch } from "@/lib/freetogame";
import { CATEGORIES } from "@/lib/categories";
import GameGrid from "@/components/GameGrid";
import { FreeBadge, PlatformBadge } from "@/components/Badges";

export const runtime = 'edge';
export const dynamic = "force-dynamic";
export const revalidate = 3600;

async function getGame(id) {
  try { return await freeToGameFetch("/game", { id }); } catch { return null; }
}

export async function generateMetadata({ params }) {
  const game = await getGame(params.id);
  if (!game) return { title: "Game not found — ArmorGames" };
  return { title: `${game.title} — ArmorGames`, description: String(game.description || "Discover this free-to-play game on ArmorGames.").slice(0, 160) };
}

export default async function GameDetailPage({ params }) {
  const game = await getGame(params.id);
  if (!game) notFound();

  let related = [];
  if (game.genre) {
    try {
      const category = CATEGORIES.find((item) => item.label.toLowerCase() === String(game.genre).toLowerCase())?.value;
      if (category) {
        const data = await freeToGameFetch("/games", { category, "sort-by": "popularity" });
        related = Array.isArray(data) ? data.filter((item) => String(item.id) !== String(game.id)).slice(0, 4) : [];
      }
    } catch {}
  }

  const screenshots = Array.isArray(game.screenshots) ? game.screenshots.slice(0, 6) : [];
  const hero = screenshots[0]?.image || game.thumbnail;
  const platform = String(game.platform || "");
  const browser = platform.toLowerCase().includes("browser");

  return <article>
    <section className="relative min-h-[620px] overflow-hidden border-b border-white/[.07] bg-[#070a0c] lg:min-h-[700px]">
      {hero && <div className="absolute inset-0"><Image src={hero} alt="" fill priority sizes="100vw" className="object-cover opacity-55" /><div className="absolute inset-0 bg-gradient-to-r from-[#070a0c] via-[#070a0c]/75 to-[#070a0c]/25" /><div className="absolute inset-0 bg-gradient-to-t from-[#070a0c] via-transparent to-[#070a0c]/15" /></div>}
      <div className="relative mx-auto flex min-h-[620px] max-w-[1440px] items-end px-5 pb-12 pt-28 sm:px-8 lg:min-h-[700px] lg:px-10 lg:pb-16">
        <div className="max-w-4xl">
          <Link href="/games" className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3.5 py-2 text-xs font-bold text-white/65 backdrop-blur-xl hover:text-white"><ArrowLeft className="h-4 w-4" /> Back to discovery</Link>
          <div className="mb-5 flex flex-wrap items-center gap-2"><FreeBadge />{game.platform && <PlatformBadge platform={game.platform} />}{game.release_date && <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[10px] font-bold text-white/60 backdrop-blur-xl"><CalendarDays className="h-3.5 w-3.5" />{new Date(game.release_date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}</span>}</div>
          <h1 className="font-display text-[clamp(3.2rem,7vw,7.3rem)] font-bold leading-[.86] tracking-[-.075em] text-white">{game.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-semibold text-white/55">{game.genre && <span className="inline-flex items-center gap-2"><Tag className="h-4 w-4 text-[#67ff47]" />{game.genre}</span>}{game.developer && <span className="inline-flex items-center gap-2"><Building2 className="h-4 w-4 text-[#67ff47]" />{game.developer}</span>}</div>
        </div>
      </div>
    </section>

    <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_340px] lg:gap-16 lg:px-10 lg:py-20">
      <div className="min-w-0">
        <section><div className="flex items-center gap-3"><span className="h-px w-8 bg-[#67ff47]" /><h2 className="font-display text-xl font-bold text-white">About this game</h2></div><p className="mt-5 max-w-3xl whitespace-pre-line text-sm leading-7 text-white/50 sm:text-[15px] sm:leading-8">{game.description || "No description was provided by the source API."}</p></section>

        {screenshots.length > 0 && <section className="mt-14"><div className="mb-5 flex items-end justify-between"><div><div className="flex items-center gap-3"><span className="h-px w-8 bg-[#67ff47]" /><h2 className="font-display text-xl font-bold text-white">Screenshots</h2></div><p className="mt-2 pl-11 text-xs text-white/30">Additional artwork supplied by the game catalog.</p></div><span className="hidden rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold text-white/35 sm:block">{screenshots.length} images</span></div><div className="grid gap-4 sm:grid-cols-2">{screenshots.map((shot, i) => <div key={shot.id || shot.image} className={`group relative overflow-hidden rounded-[20px] border border-white/[.08] bg-[#0c1113] ${i === 0 ? "sm:col-span-2" : ""}`}><div className={`relative ${i === 0 ? "aspect-[16/8]" : "aspect-video"}`}><Image src={shot.image} alt={`${game.title} screenshot ${i + 1}`} fill sizes={i === 0 ? "(max-width:640px) 100vw, 66vw" : "(max-width:640px) 100vw, 33vw"} className="object-cover transition duration-700 group-hover:scale-[1.035]" /><div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" /><span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/45 px-2.5 py-1 text-[9px] font-extrabold text-white/70 backdrop-blur">0{i + 1}</span></div></div>)}</div></section>}

        {game.minimum_system_requirements && <section className="mt-14"><div className="flex items-center gap-3"><span className="h-px w-8 bg-[#67ff47]" /><h2 className="flex items-center gap-2 font-display text-xl font-bold text-white"><Cpu className="h-5 w-5 text-[#67ff47]" /> Minimum requirements</h2></div><dl className="mt-5 grid gap-3 sm:grid-cols-2">{Object.entries(game.minimum_system_requirements).map(([key, value]) => <div key={key} className="rounded-[18px] border border-white/[.07] bg-[#0c1113] p-4"><dt className="text-[9px] font-extrabold uppercase tracking-[.17em] text-white/25">{key.replaceAll("_", " ")}</dt><dd className="mt-2 break-words text-xs leading-6 text-white/65">{value || "Not specified"}</dd></div>)}</dl></section>}

        {related.length > 0 && <section className="mt-16 border-t border-white/[.07] pt-12"><div className="mb-7 flex items-end justify-between gap-4"><div><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#67ff47]">More like this</p><h2 className="mt-2 font-display text-2xl font-bold tracking-[-.045em] text-white">Related games</h2></div><Link href={`/games?category=${encodeURIComponent(game.genre || "")}`} className="hidden items-center gap-2 text-xs font-bold text-white/40 hover:text-[#38e7ff] sm:flex">See genre <ArrowRightIcon /></Link></div><GameGrid games={related} /></section>}
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start"><div className="overflow-hidden rounded-[24px] border border-white/[.08] bg-[#0c1113] shadow-[0_25px_80px_rgba(0,0,0,.3)]">{game.thumbnail && <div className="relative aspect-[16/9]"><Image src={game.thumbnail} alt={game.title} fill sizes="340px" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#0c1113] to-transparent" /></div>}<div className="p-5"><h2 className="font-display text-lg font-bold text-white">Game details</h2><dl className="mt-5 space-y-4">{game.genre && <DetailRow icon={<Tag />} label="Genre" value={game.genre} />}{game.developer && <DetailRow icon={<Building2 />} label="Developer" value={game.developer} />}{game.publisher && <DetailRow icon={<UserRound />} label="Publisher" value={game.publisher} />}{game.platform && <DetailRow icon={browser ? <Globe2 /> : <Monitor />} label="Platform" value={game.platform} />}{game.release_date && <DetailRow icon={<CalendarDays />} label="Release" value={new Date(game.release_date).toLocaleDateString()} />}</dl></div></div>{game.game_url && <a href={game.game_url} target="_blank" rel="noreferrer" className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#67ff47] px-5 py-3.5 text-xs font-extrabold text-[#061009] transition hover:-translate-y-0.5 hover:bg-[#b8ff3c]">Open official game page <ExternalLink className="h-4 w-4" /></a>}<Link href="/games" className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/[.08] bg-white/[.025] px-5 py-3.5 text-xs font-bold text-white/50 hover:text-white"><ArrowLeft className="h-4 w-4" />Browse more games</Link></aside>
    </div>
  </article>;
}

function DetailRow({ icon, label, value }) {
  return <div className="flex items-start justify-between gap-4"><dt className="flex shrink-0 items-center gap-2 text-[11px] font-semibold text-white/30">{cloneIcon(icon)}{label}</dt><dd className="max-w-[190px] text-right text-xs font-bold leading-5 text-white/70">{value}</dd></div>;
}
function cloneIcon(icon) { return <span className="[&_svg]:h-3.5 [&_svg]:w-3.5">{icon}</span>; }
function ArrowRightIcon() { return <ArrowUpRight className="h-4 w-4" />; }
