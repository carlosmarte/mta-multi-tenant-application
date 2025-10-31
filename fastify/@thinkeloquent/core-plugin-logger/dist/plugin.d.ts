/**
 * @module @thinkeloquent/core-plugin-logger
 * Fastify plugin for logging all registered plugins
 */
import { FastifyPluginAsync } from 'fastify';
import type { PluginLoggerOptions, PluginLogResult } from './types.js';
declare const _default: FastifyPluginAsync<PluginLoggerOptions>;
export default _default;
declare module 'fastify' {
    interface FastifyInstance {
        pluginLogResult?: PluginLogResult;
    }
}
//# sourceMappingURL=plugin.d.ts.map