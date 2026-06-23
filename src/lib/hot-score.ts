/**
 * Algoritmo Hot Score estilo Reddit/Chollometro
 * Score = log10(max(voteCount, 1)) + (segundos_desde_epoch / 45000)
 *
 * El divisor 45000 controla la velocidad de decay (~12.5h para que un voto
 * compense una posición). Posts nuevos con pocos votos compiten con posts
 * viejos con muchos votos.
 */
export function calculateHotScore(voteCount: number, createdAt: Date): number {
  const order = Math.log10(Math.max(Math.abs(voteCount), 1));
  const sign = voteCount > 0 ? 1 : voteCount < 0 ? -1 : 0;
  const seconds = createdAt.getTime() / 1000 - 1_700_000_000; // epoch base arbitraria
  return sign * order + seconds / 45000;
}

/**
 * Score para la vista "Subiendo" — posts con velocidad de votos alta en las
 * últimas N horas. Favorece posts recientes con muchos votos relativos.
 */
export function calculateRisingScore(
  voteCount: number,
  createdAt: Date,
  hoursWindow = 24
): number {
  const ageHours = (Date.now() - createdAt.getTime()) / 3_600_000;
  if (ageHours > hoursWindow) return 0;
  // Normaliza votos por edad para obtener velocidad
  const velocity = voteCount / Math.max(ageHours, 0.5);
  return velocity;
}
