/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "#2A2A2A",
        background: "#121212",
        foreground: "#FAFAFA",
        surface: "#1E1E1E",
        "surface-elevated": "#2A2A2A",
        card: "#161616",
        muted: "#2A2A2A",
        "muted-foreground": "#A1A1AA",
        sos: "#E11D48",
        "sos-foreground": "#FFFFFF",
        "sos-glow": "#9F1239",
        online: "#10B981",
      },
    },
  },
  plugins: [],
}
