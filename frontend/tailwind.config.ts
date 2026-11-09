import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {
    colors: {
      ink: "#0b1020", panel: "#111a2e", line: "#24314a",
      muted: "#8b9ab5", cyan: "#38bdf8", violet: "#8b5cf6"
    },
    boxShadow: { glow: "0 0 35px rgba(56,189,248,.10)" }
  }},
  plugins: []
};
export default config;
