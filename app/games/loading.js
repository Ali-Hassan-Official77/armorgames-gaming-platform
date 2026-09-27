import LoadingSkeleton from "@/components/LoadingSkeleton";
export const runtime = 'edge';
export default function Loading() { return <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10"><div className="skeleton mb-8 h-10 w-72 animate-shimmer rounded-xl" /><LoadingSkeleton count={12} /></section>; }
