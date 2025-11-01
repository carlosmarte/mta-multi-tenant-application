/**
 * @module @thinkeloquent/core-route-logger
 * Fastify plugin for logging all registered routes
 */
import { FastifyPluginAsync } from 'fastify';
import type { RouteLoggerOptions, RouteLogResult } from './types.js';
declare const _default: FastifyPluginAsync<RouteLoggerOptions>;
export default _default;
declare module 'fastify' {
    interface FastifyInstance {
        routeLogResult?: RouteLogResult;
    }
}
//# sourceMappingURL=plugin.d.ts.map