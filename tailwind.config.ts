import type { Config } from "tailwindcss"

const config = {
  plugins: [
    require('tailwindcss-animated')
  ],
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
        "text-color": "rgba(var(--text-color) / <alpha-value>)",
        "button-color": "rgba(var(--button-color) / <alpha-value>)",
        "text-color-currencie": "rgba(var(--text-color-currencie) / <alpha-value>)",
        "color-blocked": "rgba(var(--color-blocked) / <alpha-value>)",
        "color-details": "rgba(var(--color-details) / <alpha-value>)",
        "color-separate": "rgba(var(--color-separate) / <alpha-value>)",
        "color-border-metmask": "rgba(var(--color-border-metmask) / <alpha-value>)",
        "text-color-selection": "rgba(var(--text-color-selection) / <alpha-value>)",
        primary: "rgba(var(--primary) / <alpha-value>)"
      },
      borderRadius:{
        
      }  
    },
  },
} satisfies Config

export default config