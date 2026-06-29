// Brand colors for AI-tool compatibility tags (Skills y extensiones).
// Each tag renders with the representative color of its tool.
export interface TagStyle {
  bg: string;
  text: string;
  border: string;
}

const TAG_STYLES: Record<string, TagStyle> = {
  claude: { bg: "#FBF1EC", text: "#B8521F", border: "#EAD3C4" }, // Anthropic coral
  cursor: { bg: "#F4F4F5", text: "#18181B", border: "#D4D4D8" }, // Cursor black
  chatgpt: { bg: "#ECFDF5", text: "#0E8A6B", border: "#A7F3D0" }, // OpenAI green
  gemini: { bg: "#EFF4FE", text: "#1A56DB", border: "#C7D9F8" }, // Google blue
  cualquiera: { bg: "#F4F4F5", text: "#52525B", border: "#E4E4E7" }, // neutral
};

const FALLBACK: TagStyle = { bg: "#F0FDFA", text: "#0F766E", border: "#99F6E4" };

export function tagStyle(slug: string): TagStyle {
  return TAG_STYLES[slug] ?? FALLBACK;
}
