/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['src/**/*.{njk,js}'],
	theme: {
		extend: {},
	},
	plugins: [],
	corePlugins: {
		container: false,
		preflight: false,
	},
};
