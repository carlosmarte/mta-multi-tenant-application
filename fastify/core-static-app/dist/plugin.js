import fp from 'fastify-plugin';
import fastifyStatic from '@fastify/static';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { StaticAppOptionsSchema } from './types.js';
/**
 * Core Static App Plugin
 *
 * Serves static files from a directory.
 */
const coreStaticAppPlugin = async (fastify, options) => {
    // Validate options with Zod
    const opts = StaticAppOptionsSchema.parse(options);
    // Resolve absolute path for root directory
    const rootPath = resolve(opts.root);
    // Check if root directory exists
    if (!existsSync(rootPath)) {
        const error = `Static root directory does not exist: ${rootPath}`;
        fastify.log.error(`[core-static-app] ${error}`);
        throw new Error(error);
    }
    // Log configuration
    fastify.log.info(`[core-static-app] Serving static files from: ${rootPath}`);
    fastify.log.info(`[core-static-app] URL prefix: ${opts.prefix}`);
    // Determine caching strategy
    const useNoCache = opts.maxAge === 0;
    if (useNoCache) {
        fastify.log.info('[core-static-app] No-cache: enabled (maxAge: 0)');
    }
    else {
        fastify.log.info(`[core-static-app] Cache max-age: ${opts.maxAge} seconds`);
    }
    // Register @fastify/static plugin
    await fastify.register(fastifyStatic, {
        root: rootPath,
        prefix: opts.prefix,
        index: opts.index,
        dotfiles: opts.dotfiles ? 'allow' : 'deny',
        etag: opts.etag,
        maxAge: opts.maxAge * 1000, // Convert seconds to milliseconds
        preCompressed: opts.preCompressed,
        // Always set decorateReply to false to avoid conflicts
        decorateReply: false,
    });
    // Apply no-cache headers when maxAge is 0
    if (useNoCache) {
        fastify.addHook('onSend', async (request, reply) => {
            // Only apply to static file requests under our prefix
            if (request.url.startsWith(opts.prefix)) {
                reply.header('Cache-Control', 'no-cache, no-store, must-revalidate');
                reply.header('Pragma', 'no-cache');
                reply.header('Expires', '0');
            }
        });
    }
    fastify.log.info('[core-static-app] Plugin initialized successfully');
};
// Export as fastify plugin with metadata
export default fp(coreStaticAppPlugin, {
    name: 'core-static-app',
    fastify: '>=5.0.0',
});
//# sourceMappingURL=plugin.js.map