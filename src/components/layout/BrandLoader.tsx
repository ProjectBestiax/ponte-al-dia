export function BrandLoader() {
  return (
    <div className="flex items-center justify-center" style={{ minHeight: "60vh" }}>
      <div className="relative flex items-center justify-center">
        {/* Expanding ring */}
        <span
          className="dia-ring absolute rounded-[14px] bg-zinc-950"
          style={{ width: 56, height: 56 }}
          aria-hidden="true"
        />
        {/* Pulsing logo */}
        <div
          className="dia-beat relative flex items-center justify-center rounded-[14px] bg-zinc-950 text-white"
          style={{ width: 56, height: 56, fontFamily: "var(--font-manrope)", fontWeight: 800, fontSize: 24, letterSpacing: "-0.02em" }}
          role="status"
          aria-label="Cargando"
        >
          d<span style={{ fontWeight: 500 }}>I</span>A
        </div>
      </div>
    </div>
  );
}
