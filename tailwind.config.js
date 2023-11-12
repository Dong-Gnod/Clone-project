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
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundImage: {
        'white': 'url("https://img.freepik.com/free-photo/cement-texture_1194-5269.jpg")',
      },
      colors: {
        'play': 'rgba(255, 255, 255)',
        'detailInfo': 'rgba(255, 255, 255, 0.75)',
      },
    },
  },
  plugins: [],
}
