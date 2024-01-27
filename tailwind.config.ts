import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "text-color": "#002859",
        "button-color": "#035AC5",
        "text-color-currencie":"#647184",
        primary: "rgba(var(--primary) / <alpha-value>)"
      },
      borderRadius:{
        
      }  
    },
  },
} satisfies Config

export default config