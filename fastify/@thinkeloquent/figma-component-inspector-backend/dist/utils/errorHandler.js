/**
 * Global Error Handler
 *
 * Comprehensive error handling for Fastify with defensive programming patterns.
 * Provides clear stack traces and proper error formatting for debugging.
 */
import { ZodError } from 'zod';
/**
 * Format Zod Validation Errors
 */
function formatZodError(error) {
    return error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
    }));
}
/**
 * Global Error Handler Plugin
 * Note: Fastify expects parameters in order: error, request, reply
 */
export async function errorHandler(error, request, reply) {
    // Log error with context
    request.log.error({
        err: error,
        request: {
            method: request.method,
            url: request.url,
            params: request.params,
            query: request.query,
        },
    }, 'Request error');
    // Handle Zod validation errors
    if (error.cause instanceof ZodError) {
        return reply.status(400).send({
            error: 'Validation Error',
            message: 'Invalid request data',
            statusCode: 400,
            validation: formatZodError(error.cause),
            ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
        });
    }
    // Handle Fastify validation errors
    if (error.validation) {
        return reply.status(400).send({
            error: 'Validation Error',
            message: error.message,
            statusCode: 400,
            validation: error.validation,
            ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
        });
    }
    // Handle Sequelize errors
    if (error.name?.includes('Sequelize')) {
        const statusCode = error.statusCode || 500;
        return reply.status(statusCode).send({
            error: 'Database Error',
            message: process.env.NODE_ENV === 'development' ? error.message : 'A database error occurred',
            statusCode,
            ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
        });
    }
    // Handle 404 errors
    if (error.statusCode === 404) {
        return reply.status(404).send({
            error: 'Not Found',
            message: error.message || 'Resource not found',
            statusCode: 404,
        });
    }
    // Handle custom errors with statusCode
    if (error.statusCode && error.statusCode !== 500) {
        return reply.status(error.statusCode).send({
            error: error.name || 'Error',
            message: error.message,
            statusCode: error.statusCode,
            ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
        });
    }
    // Handle generic errors
    const statusCode = error.statusCode || 500;
    return reply.status(statusCode).send({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred',
        statusCode,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    });
}
//# sourceMappingURL=errorHandler.js.map