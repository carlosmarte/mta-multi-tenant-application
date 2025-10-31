/**
 * Figma Component Inspector Backend Plugin
 *
 * Registers API routes for Figma file inspection and comment management.
 */
import { createFigmaInspectorSequelizeFactory } from './sequelize/index.js';
import { figmaComponentInspectorConfig } from './config.js';
// Create figma-inspector-specific Sequelize factory
const createFigmaInspectorSequelize = createFigmaInspectorSequelizeFactory('figma-inspector', {
    enableQueryLogging: process.env.NODE_ENV === 'development',
    enableInfoLogging: false,
});
async function figmaInspectorPlugin(fastify, opts) {
    fastify.log.info('[figma-inspector] Initializing backend plugin');
    // Build DATABASE_URL from individual environment variables if available
    let databaseUrl = opts.databaseUrl || process.env.DATABASE_URL;
    if (process.env.POSTGRES_USER &&
        process.env.POSTGRES_PASSWORD &&
        process.env.POSTGRES_HOST &&
        process.env.POSTGRES_PORT &&
        process.env.POSTGRES_DB) {
        const schema = process.env.POSTGRES_SCHEMA || 'public';
        databaseUrl = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}?schema=${schema}`;
        fastify.log.info('[figma-inspector] Using database connection from environment variables');
    }
    if (!databaseUrl) {
        throw new Error('Database URL is required. Please set DATABASE_URL or PostgreSQL environment variables.');
    }
    // Initialize Sequelize with app-specific factory
    const { client, disconnect } = await createFigmaInspectorSequelize({
        databaseUrl,
        logger: {
            info: (msg) => fastify.log.info(msg),
            warn: (msg) => fastify.log.warn(msg),
            error: (msg) => fastify.log.error(msg),
        },
    });
    // Decorate fastify instance with Sequelize models
    fastify.decorate('figmaInspectorDb', client);
    fastify.log.info('[figma-inspector] Sequelize client initialized');
    const { backendPrefix: prefix = figmaComponentInspectorConfig.backendPrefix } = opts;
    // Register routes in encapsulated scope
    await fastify.register(async (scopedApp) => {
        // Dynamically import route modules
        const { registerRoutes: registerFigmaRoutes } = await import('./routes/figma.routes.js');
        const { registerRoutes: registerCommentsRoutes } = await import('./routes/comments.routes.js');
        // Register route groups
        await scopedApp.register(registerFigmaRoutes);
        await scopedApp.register(registerCommentsRoutes);
        fastify.log.info('[figma-inspector] Routes registered successfully');
    }, { prefix });
    // Add cleanup hook
    fastify.addHook('onClose', async () => {
        fastify.log.info('[figma-inspector] Disconnecting Sequelize client');
        await disconnect();
    });
    fastify.log.info('[figma-inspector] Backend plugin initialized successfully');
}
// Import frontend plugin
import figmaInspectorFrontendPlugin from './frontend.plugin.js';
// Export both plugins
export default figmaInspectorPlugin;
export { figmaInspectorFrontendPlugin as frontendPlugin };
// Also export a combined plugin that registers both backend and frontend
export async function figmaInspectorFullPlugin(fastify, opts) {
    // Register backend plugin
    await fastify.register(figmaInspectorPlugin, {
        ...opts,
        backendPrefix: opts.backendPrefix || opts.prefix || figmaComponentInspectorConfig.backendPrefix
    });
    // Register frontend plugin
    await fastify.register(figmaInspectorFrontendPlugin, {
        frontendPrefix: opts.frontendPrefix || figmaComponentInspectorConfig.frontendPrefix
    });
}
//# sourceMappingURL=backend.plugin.js.map