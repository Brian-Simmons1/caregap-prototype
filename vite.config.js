import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // For GitHub Pages at https://<user>.github.io/<repo>/
  // Change this if you rename the repo. Use "/" for a custom domain.
  base: "/caregap-prototype/",
});
