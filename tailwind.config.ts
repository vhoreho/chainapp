import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      s: "600px",
      md: "744px",
      lg: "1024px",
      xl: "1200px",
      "2xl": "1440px",
    },
    extend: {
      fontFamily: {},
      keyframes: {
        appear: {
          "0%": { opacity: "0" },
          "100%": { opacity: "" },
        },
        rollout: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        rolloutX: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        scale: {
          "0%": { scale: "0" },
          "100%": { scale: "1" },
        },
      },
      animation: {
        appear: "appear .3s",
        rollout: "rollout .3s",
        rollout100: "rollout .5s 100ms",
        rollout200: "rollout .5s 200ms",
        rollout300: "rollout .5s 300ms",
        rollout400: "rollout .5s 400ms",
        rollout500: "rollout .5s 500ms",
        rollout600: "rollout .5s 600ms",
        rollout700: "rollout .5s 700ms",
        rolloutX: "rolloutX .3s",
        scale: "scale .3s",
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
        "accordion-open": "transition-all ease-out duration-300 transform scale-y-0",
        "accordion-close": "transition-all ease-in duration-300 transform scale-y-100",
      },
      colors: {
        transparent: "transparent",
        cornflower: {
          500: "#6d8bea",
        },
        platinum: {
          500: "#F3F7F0",
        },
        davy: {
          500: "#5B5B5B",
        },
        red: {
          500: "#db331e",
        },
      },
    },
  },
  variants: {},
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
