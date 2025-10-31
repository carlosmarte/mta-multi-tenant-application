/**
 * Figma Service
 *
 * Service layer for interacting with Figma REST API.
 * Implements defensive programming with comprehensive error handling and validation.
 */
import { FigmaFileResponseSchema, FigmaImagesResponseSchema, FigmaVariablesResponseSchema, } from '../zod-schema-contract/index.js';
import { FigmaApiError, parseFigmaErrorScopes } from '../errors/FigmaApiError.js';
import { logger } from '../utils/logger.js';
/**
 * Validate Figma Token
 */
const validateFigmaToken = () => {
    const token = process.env.FIGMA_TOKEN;
    if (!token || token.trim() === '') {
        throw new Error('FIGMA_TOKEN environment variable is not set');
    }
    return token;
};
/**
 * Figma API Base URL
 */
const FIGMA_API_BASE = 'https://api.figma.com/v1';
/**
 * Fetch with error handling
 */
async function fetchFigma(url, schema) {
    const token = validateFigmaToken();
    try {
        const response = await fetch(url, {
            headers: {
                'X-Figma-Token': token,
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.err || errorData.message || response.statusText;
            const fullErrorMessage = `Figma API error: ${response.status} ${response.statusText}. ${errorMessage}`;
            // Parse missing scopes for 403 errors
            const missingScopes = response.status === 403 ? parseFigmaErrorScopes(fullErrorMessage) : undefined;
            // Create structured error
            const apiError = new FigmaApiError({
                message: fullErrorMessage,
                statusCode: response.status,
                endpoint: url,
                missingScopes,
                originalError: errorData,
            });
            // Log the error with details
            logger.error('Figma API request failed', {
                endpoint: url,
                statusCode: response.status,
                missingScopes,
                errorMessage: fullErrorMessage,
                userMessage: apiError.getUserMessage(),
            });
            throw apiError;
        }
        const data = await response.json();
        // Validate response with Zod schema
        const validated = schema.parse(data);
        return validated;
    }
    catch (error) {
        // If it's already a FigmaApiError, re-throw it
        if (error instanceof FigmaApiError) {
            throw error;
        }
        // Log unexpected errors
        if (error instanceof Error) {
            logger.error('Unexpected error in Figma API call', {
                endpoint: url,
                errorMessage: error.message,
                stack: error.stack,
            });
            throw error;
        }
        // Handle unknown errors
        const unknownErrorMsg = `Unknown error fetching from Figma API: ${String(error)}`;
        logger.error(unknownErrorMsg, { endpoint: url });
        throw new Error(unknownErrorMsg);
    }
}
/**
 * Get Figma File
 */
export async function getFigmaFile(fileId) {
    // Defensive validation
    if (!fileId || typeof fileId !== 'string' || fileId.trim() === '') {
        throw new Error('Invalid fileId: must be a non-empty string');
    }
    const url = `${FIGMA_API_BASE}/files/${encodeURIComponent(fileId)}`;
    return fetchFigma(url, FigmaFileResponseSchema);
}
/**
 * Get Component Images
 */
export async function getComponentImages(fileId, nodeIds, scale = 2, format = 'png') {
    // Defensive validation
    if (!fileId || typeof fileId !== 'string' || fileId.trim() === '') {
        throw new Error('Invalid fileId: must be a non-empty string');
    }
    if (!Array.isArray(nodeIds) || nodeIds.length === 0) {
        throw new Error('Invalid nodeIds: must be a non-empty array');
    }
    if (typeof scale !== 'number' || scale < 0.01 || scale > 4) {
        throw new Error('Invalid scale: must be a number between 0.01 and 4');
    }
    const nodeIdsParam = nodeIds.join(',');
    const url = `${FIGMA_API_BASE}/images/${encodeURIComponent(fileId)}?ids=${encodeURIComponent(nodeIdsParam)}&scale=${scale}&format=${format}`;
    return fetchFigma(url, FigmaImagesResponseSchema);
}
/**
 * Get File Variables
 */
export async function getFileVariables(fileId) {
    // Defensive validation
    if (!fileId || typeof fileId !== 'string' || fileId.trim() === '') {
        throw new Error('Invalid fileId: must be a non-empty string');
    }
    const url = `${FIGMA_API_BASE}/files/${encodeURIComponent(fileId)}/variables/local`;
    try {
        const response = await fetchFigma(url, FigmaVariablesResponseSchema);
        // Transform Figma variables to simplified format
        const variables = [];
        if (response.meta && response.meta.variables) {
            Object.values(response.meta.variables).forEach((variable) => {
                // Get the first mode value
                const firstMode = Object.keys(variable.valuesByMode)[0];
                const value = variable.valuesByMode[firstMode];
                let stringValue;
                if (typeof value === 'object' && 'r' in value) {
                    // Color value
                    const r = Math.round(value.r * 255);
                    const g = Math.round(value.g * 255);
                    const b = Math.round(value.b * 255);
                    stringValue = `rgba(${r}, ${g}, ${b}, ${value.a})`;
                }
                else {
                    stringValue = String(value);
                }
                variables.push({
                    name: variable.name,
                    value: stringValue,
                    type: variable.resolvedType,
                });
            });
        }
        return variables;
    }
    catch (error) {
        // Variables endpoint might not be available for all files or token may lack scope
        if (error instanceof FigmaApiError && error.isScopeError()) {
            logger.warn('Figma variables endpoint requires additional scope', {
                fileId,
                missingScopes: error.missingScopes,
                userMessage: error.getUserMessage(),
            });
        }
        else {
            logger.warn(`Could not fetch variables for file ${fileId}`, {
                error: error instanceof Error ? error.message : String(error),
            });
        }
        return [];
    }
}
/**
 * Extract Component Properties
 * Analyzes a Figma node to extract CSS-like properties
 */
export function extractComponentProperties(node) {
    // Defensive validation
    if (!node || typeof node !== 'object') {
        throw new Error('Invalid node: must be an object');
    }
    const properties = {};
    // Extract dimensions
    if (node.absoluteBoundingBox) {
        const { width, height } = node.absoluteBoundingBox;
        properties.width = {
            value: `${Math.round(width)}px`,
            type: 'dimension',
        };
        properties.height = {
            value: `${Math.round(height)}px`,
            type: 'dimension',
        };
    }
    // Extract background color
    if (node.backgroundColor) {
        const { r, g, b, a } = node.backgroundColor;
        const rInt = Math.round(r * 255);
        const gInt = Math.round(g * 255);
        const bInt = Math.round(b * 255);
        const hex = `#${rInt.toString(16).padStart(2, '0')}${gInt.toString(16).padStart(2, '0')}${bInt.toString(16).padStart(2, '0')}`;
        properties.backgroundColor = {
            value: a === 1 ? hex : `rgba(${rInt}, ${gInt}, ${bInt}, ${a})`,
            type: 'color',
        };
    }
    // Additional properties can be extracted here based on node type
    // For example: padding, borderRadius, fontSize, fontWeight, etc.
    return properties;
}
/**
 * Find Node by ID
 * Recursively searches the document tree for a node with the given ID
 */
export function findNodeById(root, nodeId) {
    // Defensive validation
    if (!root || typeof root !== 'object') {
        throw new Error('Invalid root node: must be an object');
    }
    if (!nodeId || typeof nodeId !== 'string') {
        throw new Error('Invalid nodeId: must be a non-empty string');
    }
    if (root.id === nodeId) {
        return root;
    }
    if (root.children && Array.isArray(root.children)) {
        for (const child of root.children) {
            const found = findNodeById(child, nodeId);
            if (found) {
                return found;
            }
        }
    }
    return null;
}
/**
 * Get All Component Nodes
 * Extracts all COMPONENT type nodes from the document tree
 */
export function getAllComponentNodes(root) {
    // Defensive validation
    if (!root || typeof root !== 'object') {
        throw new Error('Invalid root node: must be an object');
    }
    const components = [];
    if (root.type === 'COMPONENT') {
        components.push(root);
    }
    if (root.children && Array.isArray(root.children)) {
        for (const child of root.children) {
            components.push(...getAllComponentNodes(child));
        }
    }
    return components;
}
//# sourceMappingURL=figma.service.js.map