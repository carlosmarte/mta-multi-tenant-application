import type { FastifyPluginAsync } from 'fastify';
import type { RequestEnhancementOptions } from './types.js';
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
export declare const headerRequestEnhancements: FastifyPluginAsync<RequestEnhancementOptions>;
export default headerRequestEnhancements;
//# sourceMappingURL=index.d.ts.map