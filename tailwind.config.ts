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
        display: ["var(--font-inlander)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        // Primary Blue - #005FA6
        navy: {
          50: "#e6f0f8",
          100: "#cce1f1",
          200: "#99c3e3",
          300: "#66a5d5",
          400: "#3387c7",
          500: "#0069b9",
          600: "#005FA6",
          700: "#004d87",
          800: "#003a66",
          900: "#002844",
          950: "#001a2e",
        },
        // Accent Orange - #E94E19
        gold: {
          50: "#fef3ee",
          100: "#fde4d9",
          200: "#fbc9b3",
          300: "#f9a17e",
          400: "#f57649",
          500: "#E94E19",
          600: "#d43d0f",
          700: "#b02e0c",
          800: "#8d2510",
          900: "#722111",
          950: "#3d0f07",
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
        "gold-glow": "0 0 40px rgba(233, 78, 25, 0.25)",
        "navy-glow": "0 0 40px rgba(0, 95, 166, 0.3)",
        card: "0 4px 24px rgba(10, 12, 30, 0.08)",
        "card-hover": "0 12px 40px rgba(10, 12, 30, 0.16)",
      },
    },
  },
  plugins: [],
};
export default config;
