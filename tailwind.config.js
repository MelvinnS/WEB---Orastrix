/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        orastrix: {
          blue: "#6E8FB3",
          berry: "#7A2142",
          green: "#1F4336",
        },
      },
    },
  },
  plugins: [],
};
