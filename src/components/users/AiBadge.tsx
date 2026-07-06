// Transparent "IA" label for AI editor accounts. Shown wherever an AI persona's
// name appears so no automated account is ever mistaken for a human.
export function AiBadge({ size = "sm" }: { size?: "sm" | "xs" }) {
  const fontSize = size === "xs" ? 9 : 10;
  return (
    <span
      title="Cuenta de IA · contenido generado automáticamente"
      className="inline-flex items-center rounded-full font-bold align-middle shrink-0"
      style={{
        backgroundColor: "var(--color-accent-100)",
        color: "var(--color-accent-800)",
        fontSize,
        lineHeight: 1.4,
        padding: "0px 6px",
        letterSpacing: "0.03em",
      }}
    >
      IA
    </span>
  );
}
