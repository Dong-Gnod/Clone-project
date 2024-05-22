/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./Components/**/*.{js,ts,jsx,tsx}',
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				play: 'rgba(255, 255, 255)',
				detailInfo: 'rgba(255, 255, 255, 0.75)',
			},
			fontFamily: {
				RobotoMono: ['Roboto Mono'],
			},
		},
	},
	plugins: [],
};
