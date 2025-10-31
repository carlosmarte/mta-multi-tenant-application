import type { FastifyPluginAsync } from 'fastify';
import type { SwaggerPluginOptions } from './types.js';
/**
 * Swagger/OpenAPI Documentation Plugin
 *
 * Provides interactive API documentation using Swagger UI with OpenAPI 3.1.0 specification.
 *
 * Features:
 * - Automatic OpenAPI spec generation from route schemas
 * - Interactive Swagger UI for testing endpoints
 * - TypeScript support with type-safe schemas
 * - Environment-based configuration (dev/prod)
 * - Customizable UI themes and options
 *
 * @example
 * ```ts
 * import { swaggerPlugin } from './plugins/swagger';
 *
 * // Use with default config (UI at /documentation)
 * await fastify.register(swaggerPlugin);
 *
 * // Use with custom config
 * await fastify.register(swaggerPlugin, {
 *   routePrefix: '/api-docs',
 *   openapi: {
 *     title: 'My API',
 *     version: '2.0.0'
 *   }
 * });
 * ```
 *
 * Routes:
 * - GET /documentation - Swagger UI interface
 * - GET /documentation/json - OpenAPI JSON spec
 * - GET /documentation/yaml - OpenAPI YAML spec
 */
export declare const swaggerPlugin: FastifyPluginAsync<SwaggerPluginOptions>;
export default swaggerPlugin;
export { multiModuleSwagger } from './multi-module.js';
export type { MultiModuleSwaggerOptions } from './multi-module.js';
export { moduleRegistry, ModuleSwaggerRegistry } from './module-registry.js';
export type { ModuleMetadata, ModuleDocConfig } from './module-registry.js';
export { registerModule, createModuleRouter, getModuleDocUrl, withSwaggerSchema, getAllModules, getModulesByType, generateDocIndex, registerModuleRoutes, } from './utilities.js';
export type { SwaggerPluginOptions } from './types.js';
export { defaultConfig, devConfig, prodConfig } from './config.js';
//# sourceMappingURL=index.d.ts.map