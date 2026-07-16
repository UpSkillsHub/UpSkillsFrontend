/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Prototype blue (royal periwinkle-indigo) as a single source of truth.
        brand: {
          50: "#f0f3f9",
          100: "#dbe3f1",
          200: "#b7c6e2",
          300: "#8aa0c9",
          400: "#5573a5",
          500: "#2f4f83",
          600: "#1b2a4a",
          700: "#16223c",
          800: "#111a2e",
          900: "#0c1322",
          DEFAULT: "#1b2a4a",
          dark: "#0c1322",
          light: "#f0f3f9",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16,24,40,.04), 0 8px 24px -12px rgba(27,35,80,.12)",
        lift: "0 20px 40px -16px rgba(27,35,80,.28)",
        glow: "0 12px 30px -10px rgba(27,42,74,.45)",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        gradientShift: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        fadeUp: "fadeUp .7s cubic-bezier(0.16,1,0.3,1) both",
        fadeIn: "fadeIn .8s ease-out both",
        scaleIn: "scaleIn .5s cubic-bezier(0.16,1,0.3,1) both",
        float: "float 6s ease-in-out infinite",
        gradient: "gradientShift 8s ease infinite",
      },
    },
  },
  plugins: [],
};
