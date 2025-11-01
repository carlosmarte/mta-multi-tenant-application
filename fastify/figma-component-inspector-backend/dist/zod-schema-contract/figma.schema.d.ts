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
export declare const FigmaNodeTypeSchema: z.ZodEnum<["DOCUMENT", "CANVAS", "FRAME", "GROUP", "VECTOR", "BOOLEAN_OPERATION", "STAR", "LINE", "ELLIPSE", "REGULAR_POLYGON", "RECTANGLE", "TEXT", "SLICE", "COMPONENT", "COMPONENT_SET", "INSTANCE"]>;
/**
 * Figma Node Structure (Recursive)
 */
export declare const FigmaNodeSchema: z.ZodType<any>;
/**
 * Figma Component Metadata
 */
export declare const FigmaComponentSchema: z.ZodObject<{
    key: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    componentSetId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    documentationLinks: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    key: string;
    name: string;
    description?: string | undefined;
    componentSetId?: string | null | undefined;
    documentationLinks?: string[] | undefined;
}, {
    key: string;
    name: string;
    description?: string | undefined;
    componentSetId?: string | null | undefined;
    documentationLinks?: string[] | undefined;
}>;
/**
 * Figma File Response
 */
export declare const FigmaFileResponseSchema: z.ZodObject<{
    name: z.ZodString;
    lastModified: z.ZodString;
    thumbnailUrl: z.ZodOptional<z.ZodString>;
    version: z.ZodString;
    document: z.ZodType<any, z.ZodTypeDef, any>;
    components: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        key: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        componentSetId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        documentationLinks: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        name: string;
        description?: string | undefined;
        componentSetId?: string | null | undefined;
        documentationLinks?: string[] | undefined;
    }, {
        key: string;
        name: string;
        description?: string | undefined;
        componentSetId?: string | null | undefined;
        documentationLinks?: string[] | undefined;
    }>>>;
    componentSets: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        key: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        name: string;
        description?: string | undefined;
    }, {
        key: string;
        name: string;
        description?: string | undefined;
    }>>>;
    schemaVersion: z.ZodOptional<z.ZodNumber>;
    styles: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        key: z.ZodString;
        name: z.ZodString;
        styleType: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        name: string;
        styleType: string;
        description?: string | undefined;
    }, {
        key: string;
        name: string;
        styleType: string;
        description?: string | undefined;
    }>>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    version: string;
    lastModified: string;
    styles?: Record<string, {
        key: string;
        name: string;
        styleType: string;
        description?: string | undefined;
    }> | undefined;
    thumbnailUrl?: string | undefined;
    document?: any;
    components?: Record<string, {
        key: string;
        name: string;
        description?: string | undefined;
        componentSetId?: string | null | undefined;
        documentationLinks?: string[] | undefined;
    }> | undefined;
    componentSets?: Record<string, {
        key: string;
        name: string;
        description?: string | undefined;
    }> | undefined;
    schemaVersion?: number | undefined;
}, {
    name: string;
    version: string;
    lastModified: string;
    styles?: Record<string, {
        key: string;
        name: string;
        styleType: string;
        description?: string | undefined;
    }> | undefined;
    thumbnailUrl?: string | undefined;
    document?: any;
    components?: Record<string, {
        key: string;
        name: string;
        description?: string | undefined;
        componentSetId?: string | null | undefined;
        documentationLinks?: string[] | undefined;
    }> | undefined;
    componentSets?: Record<string, {
        key: string;
        name: string;
        description?: string | undefined;
    }> | undefined;
    schemaVersion?: number | undefined;
}>;
/**
 * Figma Variable Types
 */
export declare const FigmaVariableTypeSchema: z.ZodEnum<["COLOR", "FLOAT", "STRING", "BOOLEAN"]>;
/**
 * Figma Variable
 */
export declare const FigmaVariableSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    key: z.ZodString;
    variableCollectionId: z.ZodString;
    resolvedType: z.ZodEnum<["COLOR", "FLOAT", "STRING", "BOOLEAN"]>;
    valuesByMode: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodObject<{
        r: z.ZodNumber;
        g: z.ZodNumber;
        b: z.ZodNumber;
        a: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        r: number;
        g: number;
        b: number;
        a: number;
    }, {
        r: number;
        g: number;
        b: number;
        a: number;
    }>]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    key: string;
    name: string;
    variableCollectionId: string;
    resolvedType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN";
    valuesByMode: Record<string, string | number | boolean | {
        r: number;
        g: number;
        b: number;
        a: number;
    }>;
}, {
    id: string;
    key: string;
    name: string;
    variableCollectionId: string;
    resolvedType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN";
    valuesByMode: Record<string, string | number | boolean | {
        r: number;
        g: number;
        b: number;
        a: number;
    }>;
}>;
/**
 * Figma Variables Response
 */
export declare const FigmaVariablesResponseSchema: z.ZodObject<{
    status: z.ZodNumber;
    error: z.ZodBoolean;
    meta: z.ZodObject<{
        variables: z.ZodRecord<z.ZodString, z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            key: z.ZodString;
            variableCollectionId: z.ZodString;
            resolvedType: z.ZodEnum<["COLOR", "FLOAT", "STRING", "BOOLEAN"]>;
            valuesByMode: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodObject<{
                r: z.ZodNumber;
                g: z.ZodNumber;
                b: z.ZodNumber;
                a: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                r: number;
                g: number;
                b: number;
                a: number;
            }, {
                r: number;
                g: number;
                b: number;
                a: number;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            key: string;
            name: string;
            variableCollectionId: string;
            resolvedType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN";
            valuesByMode: Record<string, string | number | boolean | {
                r: number;
                g: number;
                b: number;
                a: number;
            }>;
        }, {
            id: string;
            key: string;
            name: string;
            variableCollectionId: string;
            resolvedType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN";
            valuesByMode: Record<string, string | number | boolean | {
                r: number;
                g: number;
                b: number;
                a: number;
            }>;
        }>>;
        variableCollections: z.ZodRecord<z.ZodString, z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            key: z.ZodString;
            modes: z.ZodArray<z.ZodObject<{
                modeId: z.ZodString;
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
                modeId: string;
            }, {
                name: string;
                modeId: string;
            }>, "many">;
            defaultModeId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            key: string;
            name: string;
            modes: {
                name: string;
                modeId: string;
            }[];
            defaultModeId: string;
        }, {
            id: string;
            key: string;
            name: string;
            modes: {
                name: string;
                modeId: string;
            }[];
            defaultModeId: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        variables: Record<string, {
            id: string;
            key: string;
            name: string;
            variableCollectionId: string;
            resolvedType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN";
            valuesByMode: Record<string, string | number | boolean | {
                r: number;
                g: number;
                b: number;
                a: number;
            }>;
        }>;
        variableCollections: Record<string, {
            id: string;
            key: string;
            name: string;
            modes: {
                name: string;
                modeId: string;
            }[];
            defaultModeId: string;
        }>;
    }, {
        variables: Record<string, {
            id: string;
            key: string;
            name: string;
            variableCollectionId: string;
            resolvedType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN";
            valuesByMode: Record<string, string | number | boolean | {
                r: number;
                g: number;
                b: number;
                a: number;
            }>;
        }>;
        variableCollections: Record<string, {
            id: string;
            key: string;
            name: string;
            modes: {
                name: string;
                modeId: string;
            }[];
            defaultModeId: string;
        }>;
    }>;
}, "strip", z.ZodTypeAny, {
    error: boolean;
    status: number;
    meta: {
        variables: Record<string, {
            id: string;
            key: string;
            name: string;
            variableCollectionId: string;
            resolvedType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN";
            valuesByMode: Record<string, string | number | boolean | {
                r: number;
                g: number;
                b: number;
                a: number;
            }>;
        }>;
        variableCollections: Record<string, {
            id: string;
            key: string;
            name: string;
            modes: {
                name: string;
                modeId: string;
            }[];
            defaultModeId: string;
        }>;
    };
}, {
    error: boolean;
    status: number;
    meta: {
        variables: Record<string, {
            id: string;
            key: string;
            name: string;
            variableCollectionId: string;
            resolvedType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN";
            valuesByMode: Record<string, string | number | boolean | {
                r: number;
                g: number;
                b: number;
                a: number;
            }>;
        }>;
        variableCollections: Record<string, {
            id: string;
            key: string;
            name: string;
            modes: {
                name: string;
                modeId: string;
            }[];
            defaultModeId: string;
        }>;
    };
}>;
/**
 * Figma Images Response
 */
export declare const FigmaImagesResponseSchema: z.ZodObject<{
    err: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    images: z.ZodRecord<z.ZodString, z.ZodNullable<z.ZodString>>;
    status: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    images: Record<string, string | null>;
    status?: number | undefined;
    err?: string | null | undefined;
}, {
    images: Record<string, string | null>;
    status?: number | undefined;
    err?: string | null | undefined;
}>;
/**
 * Component Properties (extracted)
 */
export declare const ComponentPropertySchema: z.ZodObject<{
    value: z.ZodString;
    type: z.ZodEnum<["color", "dimension", "spacing", "typography", "other"]>;
    token: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "color" | "dimension" | "spacing" | "typography" | "other";
    value: string;
    token?: string | undefined;
}, {
    type: "color" | "dimension" | "spacing" | "typography" | "other";
    value: string;
    token?: string | undefined;
}>;
/**
 * Design Variable (simplified)
 */
export declare const DesignVariableSchema: z.ZodObject<{
    name: z.ZodString;
    value: z.ZodString;
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
    name: string;
    value: string;
}, {
    type: string;
    name: string;
    value: string;
}>;
/**
 * Request Schemas
 */
export declare const GetFileRequestSchema: z.ZodObject<{
    fileId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    fileId: string;
}, {
    fileId: string;
}>;
export declare const GetImagesRequestSchema: z.ZodObject<{
    fileId: z.ZodString;
    nodeIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    scale: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    format: z.ZodDefault<z.ZodOptional<z.ZodEnum<["jpg", "png", "svg", "pdf"]>>>;
}, "strip", z.ZodTypeAny, {
    fileId: string;
    scale: number;
    format: "jpg" | "png" | "svg" | "pdf";
    nodeIds?: string[] | undefined;
}, {
    fileId: string;
    nodeIds?: string[] | undefined;
    scale?: number | undefined;
    format?: "jpg" | "png" | "svg" | "pdf" | undefined;
}>;
export declare const GetVariablesRequestSchema: z.ZodObject<{
    fileId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    fileId: string;
}, {
    fileId: string;
}>;
/**
 * Type Exports
 */
export type FigmaNodeType = z.infer<typeof FigmaNodeTypeSchema>;
export type FigmaNode = z.infer<typeof FigmaNodeSchema>;
export type FigmaComponent = z.infer<typeof FigmaComponentSchema>;
export type FigmaFileResponse = z.infer<typeof FigmaFileResponseSchema>;
export type FigmaVariable = z.infer<typeof FigmaVariableSchema>;
export type FigmaVariablesResponse = z.infer<typeof FigmaVariablesResponseSchema>;
export type FigmaImagesResponse = z.infer<typeof FigmaImagesResponseSchema>;
export type ComponentProperty = z.infer<typeof ComponentPropertySchema>;
export type DesignVariable = z.infer<typeof DesignVariableSchema>;
export type GetFileRequest = z.infer<typeof GetFileRequestSchema>;
export type GetImagesRequest = z.infer<typeof GetImagesRequestSchema>;
export type GetVariablesRequest = z.infer<typeof GetVariablesRequestSchema>;
//# sourceMappingURL=figma.schema.d.ts.map