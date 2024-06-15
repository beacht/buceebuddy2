import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*",
    "./src/components/**/*",
    "./src/app/**/*",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // "gradient-radial": "radial-gradient(circle, #B4103D, #97022A)",
        // "gradient-conic":
        //   "conic-gradient(from 180deg at 50% 50%, #B4103D, #97022A)",
        "custom-image": "url('https://imgur.com/5ykhKdG')",
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
