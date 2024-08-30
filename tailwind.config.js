/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#ef4444",
        secondary: "#f87171",
        tertiary: "#3b82f6",
        quaternary: "#FF735C",
        dark: "#385A64",
        gray: "#F5F5F5",
      },

      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
