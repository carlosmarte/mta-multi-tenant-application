/**
 * @module @thinkeloquent/core-no-cache
 * Fastify plugin for setting no-cache headers on all responses
 */
import { FastifyPluginAsync } from 'fastify';
import type { NoCacheOptions, NoCacheResult } from './types.js';
declare const _default: FastifyPluginAsync<NoCacheOptions>;
export default _default;
declare module 'fastify' {
    interface FastifyInstance {
        noCacheResult?: NoCacheResult;
    }
}
//# sourceMappingURL=plugin.d.ts.map