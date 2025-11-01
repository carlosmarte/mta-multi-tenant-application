/**
 * Default configuration for request enhancement plugin
 */
export const defaultConfig = {
    // Rate limiting
    rateLimitMax: 100,
    rateLimitTimeWindow: '1 minute',
    // CORS mode (default: allow origin with credentials)
    corsUseOrigin: false,
    corsUseAnyHost: false,
    // All plugins enabled by default
    plugins: {
        sensible: true,
        etag: true,
        helmet: true,
        rateLimit: true,
        cors: true,
        compress: true,
        formbody: true,
        multipart: true,
    },
};
/**
 * Development configuration - more permissive for local development
 */
export const devConfig = {
    rateLimitMax: 1000,
    rateLimitTimeWindow: '1 minute',
    corsUseAnyHost: true,
    plugins: {
        sensible: true,
        etag: true,
        helmet: false, // Disable for easier debugging
        rateLimit: false, // Disable for development
        cors: true,
        compress: false, // Disable for easier debugging
        formbody: true,
        multipart: true,
    },
};
/**
 * Production configuration - strict security settings
 */
export const prodConfig = {
    rateLimitMax: 50,
    rateLimitTimeWindow: '1 minute',
    corsUseOrigin: true, // Use request origin
    corsUseAnyHost: false, // Explicitly disable permissive mode
    plugins: {
        sensible: true,
        etag: true,
        helmet: true,
        rateLimit: true,
        cors: true,
        compress: true,
        formbody: true,
        multipart: true,
    },
};
//# sourceMappingURL=config.js.map