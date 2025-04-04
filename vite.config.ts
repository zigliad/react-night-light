import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
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
	publicDir: "public",
});
