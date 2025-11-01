/**
 * Figma Routes
 *
 * API endpoints for Figma file operations.
 * Implements Zod validation and defensive error handling.
 */
import { GetFileRequestSchema, GetImagesRequestSchema, GetVariablesRequestSchema, } from '../zod-schema-contract/index.js';
import * as figmaService from '../services/figma.service.js';
import { FigmaApiError } from '../errors/FigmaApiError.js';
export async function registerRoutes(fastify) {
    // Add error handler for FigmaApiError
    fastify.setErrorHandler((error, request, reply) => {
        if (error instanceof FigmaApiError) {
            return reply.status(error.statusCode).send({
                success: false,
                error: error.getUserMessage(),
                details: error.isScopeError()
                    ? {
                        missingScopes: error.missingScopes,
                        endpoint: error.endpoint,
                    }
                    : undefined,
            });
        }
        // Re-throw for default handler
        throw error;
    });
    /**
     * GET /api/figma/files/:fileId
     * Get Figma file structure and metadata
     */
    fastify.get('/files/:fileId', async (request, reply) => {
        // Validate params
        const params = GetFileRequestSchema.parse(request.params);
        // Fetch file data
        const fileData = await figmaService.getFigmaFile(params.fileId);
        return reply.send({
            success: true,
            data: fileData,
        });
    });
    /**
     * GET /api/figma/images/:fileId
     * Get component images
     */
    fastify.get('/images/:fileId', async (request, reply) => {
        // Parse nodeIds from comma-separated string
        const nodeIdsArray = request.query.nodeIds ? request.query.nodeIds.split(',') : [];
        // Parse scale to number (query params come as strings)
        const scaleParam = request.query.scale ? Number(request.query.scale) : undefined;
        // Validate request
        const validated = GetImagesRequestSchema.parse({
            fileId: request.params.fileId,
            nodeIds: nodeIdsArray.length > 0 ? nodeIdsArray : undefined,
            scale: scaleParam,
            format: request.query.format,
        });
        // Defensive check
        if (!validated.nodeIds || validated.nodeIds.length === 0) {
            return reply.status(400).send({
                success: false,
                error: 'nodeIds query parameter is required',
            });
        }
        // Fetch images
        const images = await figmaService.getComponentImages(validated.fileId, validated.nodeIds, validated.scale, validated.format);
        return reply.send({
            success: true,
            data: images,
        });
    });
    /**
     * GET /api/figma/variables/:fileId
     * Get file variables/design tokens
     */
    fastify.get('/variables/:fileId', async (request, reply) => {
        // Validate params
        const params = GetVariablesRequestSchema.parse(request.params);
        // Fetch variables
        const variables = await figmaService.getFileVariables(params.fileId);
        return reply.send({
            success: true,
            data: variables,
        });
    });
    /**
     * GET /api/figma/node/:fileId/:nodeId
     * Get specific node details and properties
     */
    fastify.get('/node/:fileId/:nodeId', async (request, reply) => {
        const { fileId, nodeId } = request.params;
        // Defensive validation
        if (!fileId || !nodeId) {
            return reply.status(400).send({
                success: false,
                error: 'fileId and nodeId are required',
            });
        }
        // Get file data
        const fileData = await figmaService.getFigmaFile(fileId);
        // Find the specific node
        const node = figmaService.findNodeById(fileData.document, nodeId);
        if (!node) {
            return reply.status(404).send({
                success: false,
                error: 'Node not found',
            });
        }
        // Extract properties
        const properties = figmaService.extractComponentProperties(node);
        return reply.send({
            success: true,
            data: {
                node,
                properties,
            },
        });
    });
    /**
     * GET /api/figma/components/:fileId
     * Get all component nodes
     */
    fastify.get('/components/:fileId', async (request, reply) => {
        const { fileId } = request.params;
        // Defensive validation
        if (!fileId) {
            return reply.status(400).send({
                success: false,
                error: 'fileId is required',
            });
        }
        // Get file data
        const fileData = await figmaService.getFigmaFile(fileId);
        // Get all components
        const components = figmaService.getAllComponentNodes(fileData.document);
        return reply.send({
            success: true,
            data: {
                components,
                count: components.length,
            },
        });
    });
}
//# sourceMappingURL=figma.routes.js.map