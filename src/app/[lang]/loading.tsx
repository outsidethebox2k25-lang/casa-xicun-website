export default function Loading() {
  return (
    <div className="min-h-[60svh] flex items-center justify-center bg-xicun-cream">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <span className="absolute inset-0 rounded-full border-2 border-xicun-line" />
          <span className="absolute inset-0 animate-spin rounded-full border-t-2 border-xicun-gold" />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-editorial text-xicun-stone">
          Loading
        </p>
      </div>
    </div>
  );
}
