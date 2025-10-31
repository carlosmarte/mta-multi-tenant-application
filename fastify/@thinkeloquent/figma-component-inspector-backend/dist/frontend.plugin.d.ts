/**
 * Figma Component Inspector Frontend Plugin
 *
 * Serves the React SPA for the Figma Component Inspector app.
 */
import type { FastifyInstance, FastifyPluginOptions } from "fastify";
export interface FigmaInspectorFrontendPluginOptions extends FastifyPluginOptions {
    frontendPrefix?: string;
    frontendStaticPrefix?: string;
}
declare function figmaInspectorFrontendPlugin(fastify: FastifyInstance, opts: FigmaInspectorFrontendPluginOptions): Promise<void>;
export default figmaInspectorFrontendPlugin;
//# sourceMappingURL=frontend.plugin.d.ts.map