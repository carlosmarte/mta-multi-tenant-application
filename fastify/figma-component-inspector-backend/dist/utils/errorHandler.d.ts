/**
 * Global Error Handler
 *
 * Comprehensive error handling for Fastify with defensive programming patterns.
 * Provides clear stack traces and proper error formatting for debugging.
 */
import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
/**
 * Global Error Handler Plugin
 * Note: Fastify expects parameters in order: error, request, reply
 */
export declare function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply): Promise<never>;
//# sourceMappingURL=errorHandler.d.ts.map