/**
 * Figma API Schema Contracts
 *
 * Zod validation schemas for Figma API types and responses.
 * These schemas ensure type safety and runtime validation across the application.
 */
import { z } from 'zod';
/**
 * Figma Node Types
 */
export const FigmaNodeTypeSchema = z.enum([
    'DOCUMENT',
    'CANVAS',
    'FRAME',
    'GROUP',
    'VECTOR',
    'BOOLEAN_OPERATION',
    'STAR',
    'LINE',
    'ELLIPSE',
    'REGULAR_POLYGON',
    'RECTANGLE',
    'TEXT',
    'SLICE',
    'COMPONENT',
    'COMPONENT_SET',
    'INSTANCE',
]);
/**
 * Figma Node Structure (Recursive)
 */
export const FigmaNodeSchema = z.lazy(() => z.object({
    id: z.string(),
    name: z.string(),
    type: FigmaNodeTypeSchema,
    visible: z.boolean().optional(),
    locked: z.boolean().optional(),
    children: z.array(FigmaNodeSchema).optional(),
    backgroundColor: z.object({
        r: z.number(),
        g: z.number(),
        b: z.number(),
        a: z.number(),
    }).optional(),
    absoluteBoundingBox: z.object({
        x: z.number(),
        y: z.number(),
        width: z.number(),
        height: z.number(),
    }).optional(),
    styles: z.record(z.string()).optional(),
}));
/**
 * Figma Component Metadata
 */
export const FigmaComponentSchema = z.object({
    key: z.string(),
    name: z.string(),
    description: z.string().optional(),
    componentSetId: z.string().nullable().optional(),
    documentationLinks: z.array(z.string()).optional(),
});
/**
 * Figma File Response
 */
export const FigmaFileResponseSchema = z.object({
    name: z.string(),
    lastModified: z.string(),
    thumbnailUrl: z.string().optional(),
    version: z.string(),
    document: FigmaNodeSchema,
    components: z.record(FigmaComponentSchema).optional(),
    componentSets: z.record(z.object({
        key: z.string(),
        name: z.string(),
        description: z.string().optional(),
    })).optional(),
    schemaVersion: z.number().optional(),
    styles: z.record(z.object({
        key: z.string(),
        name: z.string(),
        styleType: z.string(),
        description: z.string().optional(),
    })).optional(),
});
/**
 * Figma Variable Types
 */
export const FigmaVariableTypeSchema = z.enum(['COLOR', 'FLOAT', 'STRING', 'BOOLEAN']);
/**
 * Figma Variable
 */
export const FigmaVariableSchema = z.object({
    id: z.string(),
    name: z.string(),
    key: z.string(),
    variableCollectionId: z.string(),
    resolvedType: FigmaVariableTypeSchema,
    valuesByMode: z.record(z.union([
        z.string(),
        z.number(),
        z.boolean(),
        z.object({
            r: z.number(),
            g: z.number(),
            b: z.number(),
            a: z.number(),
        }),
    ])),
});
/**
 * Figma Variables Response
 */
export const FigmaVariablesResponseSchema = z.object({
    status: z.number(),
    error: z.boolean(),
    meta: z.object({
        variables: z.record(FigmaVariableSchema),
        variableCollections: z.record(z.object({
            id: z.string(),
            name: z.string(),
            key: z.string(),
            modes: z.array(z.object({
                modeId: z.string(),
                name: z.string(),
            })),
            defaultModeId: z.string(),
        })),
    }),
});
/**
 * Figma Images Response
 */
export const FigmaImagesResponseSchema = z.object({
    err: z.string().nullable().optional(),
    images: z.record(z.string().nullable()),
    status: z.number().optional(),
});
/**
 * Component Properties (extracted)
 */
export const ComponentPropertySchema = z.object({
    value: z.string(),
    type: z.enum(['color', 'dimension', 'spacing', 'typography', 'other']),
    token: z.string().optional(),
});
/**
 * Design Variable (simplified)
 */
export const DesignVariableSchema = z.object({
    name: z.string(),
    value: z.string(),
    type: z.string(),
});
/**
 * Request Schemas
 */
export const GetFileRequestSchema = z.object({
    fileId: z.string().min(1, 'File ID is required'),
});
export const GetImagesRequestSchema = z.object({
    fileId: z.string().min(1, 'File ID is required'),
    nodeIds: z.array(z.string()).optional(),
    scale: z.number().min(0.01).max(4).optional().default(2),
    format: z.enum(['jpg', 'png', 'svg', 'pdf']).optional().default('png'),
});
export const GetVariablesRequestSchema = z.object({
    fileId: z.string().min(1, 'File ID is required'),
});
//# sourceMappingURL=figma.schema.js.map