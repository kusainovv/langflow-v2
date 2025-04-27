import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import {
  API_ROUTES,
  BASENAME,
  PORT,
  PROXY_TARGET,
} from "./src/customization/config-constants";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const frontendPort = Number(env.VITE_PORT) || PORT || 3000;

  const mlApiTarget = env.VITE_PROXY_TARGET || PROXY_TARGET || "http://127.0.0.1:7860";
  const googleAuthTarget = env.VITE_AUTH_TARGET || "http://localhost:4000";

  const proxyRoutesML = (API_ROUTES || ["^/api/v1/", "/health"]).reduce(
    (proxyObj, route) => {
      proxyObj[route] = {
        target: mlApiTarget,
        changeOrigin: true,
        secure: false,
        ws: true,
      };
      return proxyObj;
    },
    {}
  );

  const proxyRoutesGoogle = {
    "/auth": {
      target: googleAuthTarget,
      changeOrigin: true,
      secure: false,
      ws: true,
    },
  };

  return {
    base: BASENAME || "",
    build: {
      outDir: "build",
    },
    define: {
      "process.env.BACKEND_URL": JSON.stringify(env.BACKEND_URL),
      "process.env.ACCESS_TOKEN_EXPIRE_SECONDS": JSON.stringify(env.ACCESS_TOKEN_EXPIRE_SECONDS),
      "process.env.CI": JSON.stringify(env.CI),
    },
    plugins: [react(), svgr(), tsconfigPaths()],
    server: {
      port: frontendPort,
      proxy: {
        ...proxyRoutesML,
        ...proxyRoutesGoogle,
      },
    },
    preview: {
      port: 3000,
    },
  };
});