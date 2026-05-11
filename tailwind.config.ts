import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: "#FF6B6B",
          light: "#FF8E8E",
          dark: "#E85555",
        },
        "soft-blue": "#4D96FF",
        bg: "#F7F7F8",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "swipe-left": {
          from: { transform: "translateX(var(--swipe-start-x, -80px)) rotate(-5deg)" },
          to: { transform: "translateX(-120%) rotate(-20deg)", opacity: "0" },
        },
        "swipe-right": {
          from: { transform: "translateX(var(--swipe-start-x, 80px)) rotate(5deg)" },
          to: { transform: "translateX(120%) rotate(20deg)", opacity: "0" },
        },
        "slide-up": {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "pop-in": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "70%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "confetti-fall": {
          "0%": { transform: "translateY(-20px) rotate(0deg)", opacity: "1" },
          "80%": { opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(720deg)", opacity: "0" },
        },
        "heart-beat": {
          "0%, 100%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.35)" },
          "60%": { transform: "scale(1.1)" },
        },
        "star-pop": {
          "0%": { transform: "scale(0) rotate(-30deg)", opacity: "0" },
          "60%": { transform: "scale(1.3) rotate(10deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
      },
      animation: {
        "swipe-left": "swipe-left 0.35s ease-out forwards",
        "swipe-right": "swipe-right 0.35s ease-out forwards",
        "slide-up": "slide-up 0.4s ease-out",
        "pop-in": "pop-in 0.4s ease-out",
        "bounce-slow": "bounce-slow 1.8s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "confetti-fall": "confetti-fall 2.2s ease-in forwards",
        "heart-beat": "heart-beat 0.5s ease-in-out",
        "star-pop": "star-pop 0.35s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
