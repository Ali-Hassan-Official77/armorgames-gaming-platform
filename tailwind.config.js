/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: { display: ["var(--font-display)", "sans-serif"], sans: ["var(--font-sans)", "sans-serif"] },
      colors: { armor: { DEFAULT: "#b7ff3c", soft: "#d8ff83", deep: "#83bd19" } },
      animation: { fadeUp: "fadeUp .6s cubic-bezier(.22,1,.36,1) both" },
      keyframes: { fadeUp: { "0%": { opacity: "0", transform: "translateY(10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } } },
    },
  },
  plugins: [],
};
