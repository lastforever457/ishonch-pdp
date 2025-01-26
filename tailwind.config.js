/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "var(--theme-color)",
          green: "#90C049",
          gray: "#636363",
          orange: "#FFA800",
          purple: "#7338AC",
          red: "#ED4337",
          bg: "#f9f9f9",
          DEFAULT: "var(--color-primary)",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          text: "#8f8f8f",
          bg: "#f0f3f4",
          DEFAULT: "var(--color-secondary)",
          foreground: "hsl(var(--secondary-foreground))",
        },
        darkPrimary: {
          blue: "#2A3F54",
          green: "#216E39",
          gray: "#2F3640",
          orange: "#A9561E",
          purple: "#5C3D8B",
          red: "#C1452E",
          bg: "#1E1E1E",
          DEFAULT: "var(--color-primary)",
          foreground: "hsl(var(--primary-foreground))",
        },
        darkSecondary: {
          text: "#8B9467",
          bg: "#252525",
          DEFAULT: "var(--color-secondary)",
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
    },
  },
  // plugins: [require("tailwindcss-animate")],
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["./src/*"],
    },
  },
};
