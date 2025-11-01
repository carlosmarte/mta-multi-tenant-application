import fastifySensible from '@fastify/sensible';
import fastifyEtag from '@fastify/etag';
import fastifyHelmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifyCors from '@fastify/cors';
import fastifyCompress from '@fastify/compress';
import fastifyFormbody from '@fastify/formbody';
import fastifyMultipart from '@fastify/multipart';
import { defaultConfig } from './config.js';
/**
 * Header Request Enhancements Plugin
 *
 * Bundles essential Fastify plugins for production-ready HTTP handling:
 *
 * 1. @fastify/sensible - HTTP utilities and better error handling
 * 2. @fastify/etag - Automatic ETag generation for caching
 * 3. @fastify/helmet - Security headers (XSS, CSP, HSTS, etc.)
 * 4. @fastify/rate-limit - Request rate limiting
 * 5. @fastify/cors - Cross-Origin Resource Sharing with advanced delegation
 * 6. @fastify/compress - Response compression (gzip/deflate/brotli)
 * 7. @fastify/formbody - Parse application/x-www-form-urlencoded
 * 8. @fastify/multipart - Handle multipart/form-data file uploads
 *
 * @example
 * ```ts
 * import { headerRequestEnhancements } from './plugins/header-request-enhancements';
 *
 * // Use with default config
 * fastify.register(headerRequestEnhancements);
 *
 * // Use with custom config
 * fastify.register(headerRequestEnhancements, {
 *   corsUseAnyHost: true,
 *   rateLimitMax: 200
 * });
 * ```
 */
export const headerRequestEnhancements = async (fastify, options) => {
    // Merge options with defaults
    const config = { ...defaultConfig, ...options };
    const pluginConfig = { ...defaultConfig.plugins, ...config.plugins };
    const enabledPlugins = [];
    const disabledPlugins = [];
    // 1. Sensible - HTTP utilities and error handling
    if (pluginConfig.sensible) {
        await fastify.register(fastifySensible);
        enabledPlugins.push('sensible');
        fastify.log.debug('✓ @fastify/sensible registered');
    }
    else {
        disabledPlugins.push('sensible');
    }
    // 2. ETag - Automatic ETag generation
    if (pluginConfig.etag) {
        await fastify.register(fastifyEtag);
        enabledPlugins.push('etag');
        fastify.log.debug('✓ @fastify/etag registered');
    }
    else {
        disabledPlugins.push('etag');
    }
    // 3. Helmet - Security headers
    if (pluginConfig.helmet) {
        await fastify.register(fastifyHelmet);
        enabledPlugins.push('helmet');
        fastify.log.debug('✓ @fastify/helmet registered');
    }
    else {
        disabledPlugins.push('helmet');
    }
    // 4. Rate Limit - Prevent abuse
    if (pluginConfig.rateLimit) {
        await fastify.register(fastifyRateLimit, {
            max: config.rateLimitMax || 100,
            timeWindow: config.rateLimitTimeWindow || '1 minute',
        });
        enabledPlugins.push(`rate-limit(${config.rateLimitMax}/${config.rateLimitTimeWindow})`);
        fastify.log.debug(`✓ @fastify/rate-limit registered (${config.rateLimitMax}/${config.rateLimitTimeWindow})`);
    }
    else {
        disabledPlugins.push('rate-limit');
    }
    // 5. CORS - Cross-Origin Resource Sharing with advanced delegation
    if (pluginConfig.cors) {
        await fastify.register(fastifyCors, {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            hook: 'preHandler',
            allowedHeaders: ['Content-Type', 'Authorization'],
            exposedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
            maxAge: 3600,
            delegator: (req, callback) => {
                // Custom delegators take precedence
                if (config.corsDelegators && config.corsDelegators.length > 0) {
                    config.corsDelegators[0](req, callback);
                    return;
                }
                // Use request origin mode
                if (config.corsUseOrigin) {
                    const origin = req.headers.origin;
                    if (origin) {
                        callback(null, { origin: true });
                    }
                    else {
                        callback(new Error('Origin not allowed'));
                    }
                    return;
                }
                // Allow any host mode (permissive)
                if (config.corsUseAnyHost) {
                    callback(null, {
                        origin: '*',
                        methods: ['GET', 'POST', 'PUT', 'DELETE'],
                        allowedHeaders: ['Content-Type', 'Authorization'],
                        exposedHeaders: ['Content-Type', 'Authorization'],
                        credentials: true,
                        maxAge: 3600,
                    });
                    return;
                }
                // Default: allow origin with credentials
                callback(null, {
                    origin: true,
                    credentials: true,
                });
            },
        });
        const corsMode = config.corsDelegators
            ? 'custom delegators'
            : config.corsUseOrigin
                ? 'use origin'
                : config.corsUseAnyHost
                    ? 'any host'
                    : 'default';
        enabledPlugins.push(`cors(${corsMode})`);
        fastify.log.debug(`✓ @fastify/cors registered (mode: ${corsMode})`);
    }
    else {
        disabledPlugins.push('cors');
    }
    // 6. Compress - Response compression
    if (pluginConfig.compress) {
        await fastify.register(fastifyCompress);
        enabledPlugins.push('compress');
        fastify.log.debug('✓ @fastify/compress registered');
    }
    else {
        disabledPlugins.push('compress');
    }
    // 7. Formbody - Parse URL-encoded forms
    if (pluginConfig.formbody) {
        await fastify.register(fastifyFormbody);
        enabledPlugins.push('formbody');
        fastify.log.debug('✓ @fastify/formbody registered');
    }
    else {
        disabledPlugins.push('formbody');
    }
    // 8. Multipart - Handle file uploads
    if (pluginConfig.multipart) {
        await fastify.register(fastifyMultipart);
        enabledPlugins.push('multipart');
        fastify.log.debug('✓ @fastify/multipart registered');
    }
    else {
        disabledPlugins.push('multipart');
    }
    // Summary log at info level with structured data
    fastify.log.info({
        enabledPlugins,
        disabledPlugins,
        enabledCount: enabledPlugins.length,
        disabledCount: disabledPlugins.length,
    }, `Header Request Enhancements loaded: ${enabledPlugins.length} enabled, ${disabledPlugins.length} disabled`);
};
export default headerRequestEnhancements;
//# sourceMappingURL=index.js.map