import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	// Base configuration for both library and demo modes
	const baseConfig = {
		base: "/react-night-light/",
		plugins: [react()],
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
