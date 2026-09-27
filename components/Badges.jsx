import { Globe2, Monitor, Sparkles } from "lucide-react";

export function FreeBadge() {
  return <span className="inline-flex items-center gap-1.5 rounded-full border border-[#67ff47]/25 bg-[#67ff47]/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#b8ff3c]"><Sparkles className="h-3 w-3" />Free</span>;
}

export function PlatformBadge({ platform }) {
  if (!platform) return null;
  const browser = platform.toLowerCase().includes("browser");
  return <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[10px] font-bold text-white/60 backdrop-blur"><>{browser ? <Globe2 className="h-3 w-3" /> : <Monitor className="h-3 w-3" />}</>{platform}</span>;
}
