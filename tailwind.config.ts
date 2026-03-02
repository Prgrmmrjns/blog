import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  darkMode: "class",
  plugins: [typography],
  content: [
    "./app/components/**/*.{vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/app.vue",
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          DEFAULT: "#7ADAA5",
          dark: "#5BC48A",
        },
        teal: {
          DEFAULT: "#239BA7",
          dark: "#1A7A84",
        },
        cream: {
          DEFAULT: "#ECECBB",
        },
        gold: {
          DEFAULT: "#E1AA36",
          dark: "#C99320",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      typography: ({ theme }) => ({
        cream: {
          css: {
            "--tw-prose-body": theme("colors.cream"),
            "--tw-prose-headings": theme("colors.cream"),
            "--tw-prose-links": theme("colors.mint"),
            "--tw-prose-bold": theme("colors.cream"),
            "--tw-prose-quotes": theme("colors.gold"),
            "--tw-prose-invert-body": theme("colors.cream"),
            "--tw-prose-invert-headings": theme("colors.cream"),
          },
        },
      }),
    },
  },
} satisfies Config;
