/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./Components/**/*.{js,ts,jsx,tsx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./public/index.html',
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
