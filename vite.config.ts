import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { ViteDevServer } from "vite";
import { sendEmail } from "./src/server/api";
import { IncomingMessage, ServerResponse } from "http";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "build",
    assetsDir: "assets",
    sourcemap: true,
  },
  plugins: [
    react(),
    componentTagger(),
    mode === "development" && componentTagger(),
    {
      name: "email-middleware",
      configureServer(server: ViteDevServer) {
        server.middlewares.use(
          async (
            req: IncomingMessage,
            res: ServerResponse,
            next: () => void
          ) => {
            if (req.url === "/api/send-email" && req.method === "POST") {
              try {
                // Get the request body
                let body = "";
                req.on("data", (chunk: Buffer) => {
                  body += chunk.toString();
                });

                req.on("end", async () => {
                  const { email } = JSON.parse(body);
                  const result = await sendEmail(email);

                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify(result));
                });
              } catch (error) {
                res.statusCode = 500;
                res.end(
                  JSON.stringify({ success: false, error: "Server error" })
                );
              }
            } else {
              next();
            }
          }
        );
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
