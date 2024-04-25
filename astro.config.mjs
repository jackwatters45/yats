import db from "@astrojs/db";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	integrations: [
		react(),
		tailwind({
			applyBaseStyles: false,
		}),
		db(),
	],
	site: "https://yatusabes.co/",
	prefetch: true,
	output: "hybrid",
	adapter: vercel(),
});
