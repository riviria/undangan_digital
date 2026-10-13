import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        deep: '#0A0D26',
        night: '#12163A',
        saffron: '#F4B73F',
        jasmine: '#F4F1FF',
        rosewood: '#D4577A',
        mist: '#A9AEDB',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
