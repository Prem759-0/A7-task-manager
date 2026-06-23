export const ColorPalette = {
  fontDark: "#000000",
  fontLight: "#ffffff",
  darkMode: "#1a1a1a",
  lightMode: "#ffffff",
  purple: "#d946ef",
  red: "#ef4444",
  orange: "#f97316",
  orangeDark: "#ea580c",
  blue: "#3b82f6",
} as const satisfies Record<string, string>;

export const themeConfig: { [key: string]: { primaryColor: string; secondaryColor?: string } } = {
  "Neo Yellow": {
    primaryColor: "#000000",
    secondaryColor: "#fde047",
  },
  "Neo Pink": {
    primaryColor: "#000000",
    secondaryColor: "#f9a8d4",
  },
  "Neo Blue": {
    primaryColor: "#000000",
    secondaryColor: "#93c5fd",
  },
  "Neo Green": {
    primaryColor: "#000000",
    secondaryColor: "#86efac",
  },
  "Cyberpunk": {
    primaryColor: "#fde047",
    secondaryColor: "#000000",
  },
  "Hot Pink Strike": {
    primaryColor: "#fdf8f5",
    secondaryColor: "#e11d48",
  },
  "Electric Cyan": {
    primaryColor: "#000000",
    secondaryColor: "#06b6d4",
  },
  "Bold Orange": {
    primaryColor: "#ffffff",
    secondaryColor: "#ea580c",
  },
};
