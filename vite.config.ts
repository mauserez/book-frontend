import { config } from "./vite.image.config";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [ViteImageOptimizer(config), react(), TanStackRouterVite()],
});
