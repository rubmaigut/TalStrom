import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-light": "#045F70",
        "primary-bg": "#F5F5F5",
        "secondary-bg": "#F4F0F0",
        "dark-bg": "#D9D9D9",
        "primary-text": "#000000BF",
        "secondary-text": "#045F70"
      }
    },
  },
  plugins: [],
};
export default config;
