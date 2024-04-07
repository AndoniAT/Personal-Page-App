import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      scale: {
        '102': '1.2',
      }
    },
  },
  /*safelist: [{ pattern: /./ }],*/
  safelist: ['w-full', 'min-h-80', 'h-fit', 'grid', 'grid-rows-12', 'grid-cols-12', 'h-full'],
  /*mode: 'jit',*/
  plugins: [],
};
export default config;
