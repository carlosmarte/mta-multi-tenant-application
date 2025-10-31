import type { FastifyRequest } from 'fastify';
import type { FastifyCorsOptions } from '@fastify/cors';
/**
 * CORS delegation callback type
 */
export type CorsDelegatorCallback = (error: Error | null, corsOptions?: FastifyCorsOptions) => void;
/**
 * CORS delegator function type
 */
export type CorsDelegator = (req: FastifyRequest, callback: CorsDelegatorCallback) => void;
/**
 * Configuration options for the header-request-enhancements plugin
 */
export interface RequestEnhancementOptions {
    /**
     * Custom CORS delegators array
     * When provided, the first delegator will be used for CORS handling
     */
    corsDelegators?: CorsDelegator[];
    /**
     * Use the request origin header for CORS validation
     * If true, allows requests from any origin that provides an Origin header
     */
    corsUseOrigin?: boolean;
    /**
     * Allow any host with full CORS permissions
     * This is the most permissive mode - use with caution in production
     */
    corsUseAnyHost?: boolean;
    /**
     * Maximum number of requests per time window (default: 100)
     */
    rateLimitMax?: number;
    /**
     * Time window for rate limiting (default: "1 minute")
     */
    rateLimitTimeWindow?: string;
    /**
     * Enable/disable specific plugins
     */
    plugins?: {
        sensible?: boolean;
        etag?: boolean;
        helmet?: boolean;
        rateLimit?: boolean;
        cors?: boolean;
        compress?: boolean;
        formbody?: boolean;
        multipart?: boolean;
    };
}
//# sourceMappingURL=types.d.ts.map