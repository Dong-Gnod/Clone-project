/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'main': 'url("https://assets.nflxext.com/ffe/siteui/vlv3/77d35039-751f-4c3e-9c8d-1240c1ca6188/ce5fcefc-78b2-4bde-aa45-e33eea8cafdb/KR-ko-20231106-popsignuptwoweeks-perspective_alpha_website_small.jpg")',
        'white': 'url("https://img.freepik.com/free-photo/cement-texture_1194-5269.jpg")',
      },
      colors: {
        'play': 'rgba(255, 255, 255)',
        'detailInfo': 'rgba(255, 255, 255, 0.75)',
      },
      fontFamily: {
        RobotoMono:['Roboto Mono'],
      }
    },
  },
  plugins: [],
}
