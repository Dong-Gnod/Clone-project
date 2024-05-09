/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
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
