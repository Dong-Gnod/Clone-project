/** @type {import('tailwindcss').Config} */
module.exports = {
	enabled: process.env.NODE_ENV === 'production',
	content: [
		'./src/**/*.{js,jsx,ts,tsx,html}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
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
