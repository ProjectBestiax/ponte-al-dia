export function FeedSkeleton() {
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "30px 36px 48px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "226px 1fr 318px", gap: 36 }}>
        {/* Left sidebar */}
        <div className="flex flex-col gap-[3px]">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-[42px] bg-zinc-100 rounded-[10px] animate-pulse" />
          ))}
          <div className="h-px bg-zinc-100 my-5" />
          <div className="h-3 w-20 bg-zinc-100 rounded animate-pulse mb-2.5 mx-3.5" />
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[38px] bg-zinc-50 rounded-[9px] animate-pulse" style={{ animationDelay: `${i * 40}ms` }} />
          ))}
        </div>

        {/* Main feed */}
        <div>
          {/* Tabs */}
          <div className="flex gap-6 border-b border-zinc-100 mb-1.5 pb-3.5">
            {[80, 60, 90].map((w, i) => (
              <div key={i} className="h-4 bg-zinc-100 rounded animate-pulse" style={{ width: w }} />
            ))}
          </div>
          {/* Featured card skeleton */}
          <div className="h-[180px] rounded-[14px] bg-zinc-50 animate-pulse mt-4 mb-2 border border-zinc-100" />
          {/* Row skeletons */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4 py-[18px] px-3 border-b border-zinc-50" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex flex-col items-center gap-1 w-[46px]">
                <div className="h-[30px] w-[30px] bg-zinc-100 rounded-[8px] animate-pulse" />
                <div className="h-3.5 w-5 bg-zinc-100 rounded animate-pulse" />
                <div className="h-[30px] w-[30px] bg-zinc-100 rounded-[8px] animate-pulse" />
              </div>
              <div className="flex-1 pt-0.5">
                <div className="h-2.5 w-48 bg-zinc-100 rounded animate-pulse mb-2" />
                <div className="h-5 w-full bg-zinc-100 rounded animate-pulse mb-3" />
                <div className="h-2.5 w-32 bg-zinc-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Right sidebar */}
        <div>
          <div className="border border-zinc-100 rounded-[14px] p-[18px]">
            <div className="h-5 w-24 bg-zinc-100 rounded animate-pulse mb-4" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-zinc-50 rounded-[8px] animate-pulse mb-[3px]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
