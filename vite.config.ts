import react from "@vitejs/plugin-react";
import { copyFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	// Base configuration for both library and demo modes
	const baseConfig = {
		base: "/react-night-light/",
		plugins: [
			react(),
			{
				name: "copy-image-assets",
				buildEnd() {
					// Copy images to the output directory to ensure they're available
					const images = [
						"bulb-off.svg",
						"bulb-on.svg",
						"handle.svg",
					];

					const outputDir = mode === "demo" ? "demo" : "dist";
					const imageDir = path.resolve(outputDir, "images");

					// Ensure the images directory exists
					if (!existsSync(imageDir)) {
						mkdirSync(imageDir, { recursive: true });
					}

					// Copy each image file
					images.forEach((image) => {
						const src = path.resolve("public/images", image);
						const dest = path.resolve(imageDir, image);
						try {
							copyFileSync(src, dest);
							console.log(`Copied ${src} to ${dest}`);
						} catch (err) {
							console.error(`Failed to copy ${src}:`, err);
						}
					});
				},
			},
		],
		publicDir: "public",
	};

	// Library build mode (default)
	if (mode !== "demo") {
		return {
			...baseConfig,
			build: {
				lib: {
					entry: path.resolve(__dirname, "src/index.ts"),
					name: "ReactNightLight",
					fileName: (format) =>
						`index.${format === "es" ? "esm" : format}.js`,
					formats: ["es", "umd"],
				},
				rollupOptions: {
					external: [
						"react",
						"react-dom",
						"framer-motion",
						"@react-spring/web",
					],
					output: {
						globals: {
							react: "React",
							"react-dom": "ReactDOM",
							"framer-motion": "FramerMotion",
							"@react-spring/web": "ReactSpring",
						},
						assetFileNames: (assetInfo) => {
							return "assets/[name][extname]";
						},
					},
				},
				sourcemap: true,
				emptyOutDir: true,
				assetsDir: "assets",
			},
		};
	}

	// Demo build mode
	return {
		...baseConfig,
		build: {
			outDir: "demo",
			sourcemap: true,
			assetsDir: "assets",
		},
	};
});
