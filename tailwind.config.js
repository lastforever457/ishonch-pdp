/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "#635AD9",
          green: "#90C049",
          gray: "#636363",
          orange: "#FFA800",
          purple: "#7338AC",
          red: "#ED4337",
        },
      },
    },
  },
  plugins: [],
};
