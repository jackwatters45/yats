const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	// darkMode: ['class'],
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	prefix: "",
	theme: {
		screens: {
			xs: "475px",
			...defaultTheme.screens,
		},
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		fontFamily: {
			sans: ["Inter", "sans-serif"],
		},
		extend: {
			colors: {
				mate: {
					grey: "#0D2622",
					"muted-light": "#B3B3B3",
					"muted-dark": "#1f423a",
					brown: "#5F4020",
					green: "#A3D952",
					"light-green": "#DEF294",
					white: "#F2F2F2",
				},
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
