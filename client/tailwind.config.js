/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0A2540",      // Deep Blue Primary
          lightBlue: "#1E3E72", // Secondary Accent Blue
          red: "#D92D20",       // Trust Red Accent
          yellow: "#F59E0B",    // Warm Yellow Accent
          lightYellow: "#FEF3C7",
          bg: "#F8FAFC",
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        gurmukhi: ['Noto Sans Gurmukhi', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
