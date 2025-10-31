/**
 * Figma Component Inspector Backend Plugin
 *
 * Registers API routes for Figma file inspection and comment management.
 */
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { FigmaInspectorDb } from './sequelize/index.js';
export interface FigmaInspectorPluginOptions extends FastifyPluginOptions {
    databaseUrl?: string;
    appName?: string;
    backendPrefix?: string;
}
declare function figmaInspectorPlugin(fastify: FastifyInstance, opts: FigmaInspectorPluginOptions): Promise<void>;
import figmaInspectorFrontendPlugin from './frontend.plugin.js';
export default figmaInspectorPlugin;
export { figmaInspectorFrontendPlugin as frontendPlugin };
export declare function figmaInspectorFullPlugin(fastify: FastifyInstance, opts: FigmaInspectorPluginOptions & {
    frontendPrefix?: string;
}): Promise<void>;
declare module 'fastify' {
    interface FastifyInstance {
        figmaInspectorDb: FigmaInspectorDb;
    }
}
//# sourceMappingURL=backend.plugin.d.ts.map