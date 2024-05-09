import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle, #B4103D, #97022A)",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, #B4103D, #97022A)",
      },
      colors: {
        "bucee-red": "#B4103D",
        "bucee-red-darker": "#A60832",
        "bucee-red-darkest": "#97022A",

        "bucee-yellow": "#F5D201",
        "bucee-yellow-darker": "#E0BF00",
        "bucee-yellow-darkest": "#CCAD00",
      }
    },
  },
  plugins: [],
};
export default config;
