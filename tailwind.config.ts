import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: "#020617",
          card: "#0b1329",
          green: "#00ff66",
          blue: "#00f0ff",
          red: "#ff0055",
          purple: "#9d4edd",
          gray: "#1e293b",
          border: "#1a3a2a",
        },
      },
      fontFamily: {
        mono: ['"Fira Code"', '"JetBrains Mono"', "monospace"],
        sans: ["Outfit", "Inter", "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glitch: "glitch 1s linear infinite",
        "border-glow": "borderGlow 4s linear infinite",
        scanline: "scanline 8s linear infinite",
        typing: "typing 3.5s steps(40, end)",
        blink: "blink 0.75s step-end infinite",
        "float": "float 6s ease-in-out infinite",
        "matrix-fall": "matrixFall 3s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 15px rgba(0,255,102,0.6))" },
          "50%": { opacity: "0.5", filter: "drop-shadow(0 0 5px rgba(0,255,102,0.2))" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)", clipPath: "inset(0 0 100% 0)" },
          "20%": { transform: "translate(-2px, 1px)", clipPath: "inset(20% 0 60% 0)" },
          "40%": { transform: "translate(2px, -1px)", clipPath: "inset(50% 0 30% 0)" },
          "60%": { transform: "translate(-1px, 2px)", clipPath: "inset(70% 0 10% 0)" },
          "80%": { transform: "translate(1px, -2px)", clipPath: "inset(40% 0 50% 0)" },
        },
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(0,255,102,0.3)", boxShadow: "0 0 8px rgba(0,255,102,0.1)" },
          "50%": { borderColor: "rgba(0,240,255,0.6)", boxShadow: "0 0 15px rgba(0,240,255,0.3)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        matrixFall: {
          "0%": { transform: "translateY(-100%)", opacity: "1" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, rgba(0,255,102,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,102,0.04) 1px, transparent 1px)",
        "grid-blue": "linear-gradient(to right, rgba(0,240,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,240,255,0.04) 1px, transparent 1px)",
        "radial-glow": "radial-gradient(ellipse at center, rgba(0,255,102,0.08) 0%, transparent 70%)",
        "hero-gradient": "radial-gradient(ellipse at top, rgba(0,255,102,0.12) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(0,240,255,0.08) 0%, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
