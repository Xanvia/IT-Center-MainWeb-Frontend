import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        maroon: "#4f0007",
        darkmaroon: "#270000",
        lightgray: "#dddddd",
        lightergray: "#eeeeee",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-roboto-mono)"],
        vietnam: ["var(--font-be-vietnam-pro)"],
        rubik: ["var(--font-rubik)"],
      },
    },
  },

  plugins: [require("daisyui"), nextui()],
  daisyui: {
    themes: ["light"],
  },
  darkMode: "class",
};
export default config;
