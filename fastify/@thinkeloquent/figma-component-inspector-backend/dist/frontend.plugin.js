/**
 * Figma Component Inspector Frontend Plugin
 *
 * Serves the React SPA for the Figma Component Inspector app.
 */
import coreSpaApp from "@thinkeloquent/core-spa-app";
import coreStaticApp from "@thinkeloquent/core-static-app";
import figmaFrontend from "@thinkeloquent/figma-component-inspector-frontend";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { figmaComponentInspectorConfig } from "./config.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
async function figmaInspectorFrontendPlugin(fastify, opts) {
    fastify.log.info("[figma-inspector] Initializing frontend plugin");
    // Use frontend module to get assets path if available, fallback to hardcoded path
    const frontendDistPath = figmaFrontend?.getStaticAssetsPath
        ? figmaFrontend.getStaticAssetsPath()
        : join(__dirname, "../../frontend/dist");
    await fastify.register(coreSpaApp, {
        root: frontendDistPath,
        prefix: opts.frontendPrefix || figmaComponentInspectorConfig.frontendPrefix,
        indexFile: "index.html",
        noCache: true,
    });
    await fastify.register(coreStaticApp, {
        root: frontendDistPath,
        prefix: opts.frontendStaticPrefix ||
            figmaComponentInspectorConfig.frontendStaticPrefix,
        maxAge: 86400, // in seconds (1 day)
    });
    fastify.log.info(`[figma-inspector] Frontend SPA configured at ${opts.frontendPrefix}, serving from ${frontendDistPath}`);
}
export default figmaInspectorFrontendPlugin;
//# sourceMappingURL=frontend.plugin.js.map