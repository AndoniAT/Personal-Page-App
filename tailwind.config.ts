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
  safelist: ['w-full', 'min-h-80', 'h-fit', 'grid', 'grid-rows-12', 'grid-cols-12', 'h-full', 
  {
    pattern: /grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12)/,
    variants: ['sm', 'lg', 'xl', '2xl'],
  },
  {
    pattern: /grid-rows-(1|2|3|4|5|6|7|8|9|10|11|12)/,
    variants: ['sm', 'lg', 'xl', '2xl'],
  }
],
  /*mode: 'jit',*/
  plugins: [],
  variants: {
    extend: {
      gridTemplateColumns: ['responsive'], // Enable responsive variants for grid columns
    },
  },
};
export default config;
