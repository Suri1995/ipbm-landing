import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        navy: {
          50: "#eef2ff",
          100: "#dbe4ff",
          200: "#b9c8ff",
          300: "#8aa0ff",
          400: "#5a6eff",
          500: "#3344ff",
          600: "#1a28f5",
          700: "#1420e1",
          800: "#171bb6",
          900: "#191e8f",
          950: "#0e1155",
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        ink: "#0a0c1e",
        cream: "#faf8f3",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        "slide-in": "slideIn 0.5s ease forwards",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      boxShadow: {
        "gold-glow": "0 0 40px rgba(245, 158, 11, 0.25)",
        "navy-glow": "0 0 40px rgba(19, 32, 225, 0.3)",
        card: "0 4px 24px rgba(10, 12, 30, 0.08)",
        "card-hover": "0 12px 40px rgba(10, 12, 30, 0.16)",
      },
    },
  },
  plugins: [],
};
export default config;
