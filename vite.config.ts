import react from "@vitejs/plugin-react";
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
					entry: "src/index.ts",
					name: "ReactNightLight",
					fileName: (format) =>
						`index.${format === "es" ? "esm" : format}.js`,
					formats: ["es", "umd"],
				},
				rollupOptions: {
					external: ["react", "react-dom", "@react-spring/web"],
					output: {
						globals: {
							react: "React",
							"react-dom": "ReactDOM",
							"@react-spring/web": "ReactSpring",
						},
					},
				},
				sourcemap: true,
				emptyOutDir: true,
			},
		};
	}

	// Demo build mode
	return {
		...baseConfig,
		build: {
			outDir: "demo",
			sourcemap: true,
		},
	};
});
