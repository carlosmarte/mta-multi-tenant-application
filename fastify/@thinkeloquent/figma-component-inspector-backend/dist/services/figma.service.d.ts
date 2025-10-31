/**
 * Figma Service
 *
 * Service layer for interacting with Figma REST API.
 * Implements defensive programming with comprehensive error handling and validation.
 */
import { type FigmaFileResponse, type FigmaImagesResponse, type FigmaNode, type ComponentProperty, type DesignVariable } from '../zod-schema-contract/index.js';
/**
 * Get Figma File
 */
export declare function getFigmaFile(fileId: string): Promise<FigmaFileResponse>;
/**
 * Get Component Images
 */
export declare function getComponentImages(fileId: string, nodeIds: string[], scale?: number, format?: 'jpg' | 'png' | 'svg' | 'pdf'): Promise<FigmaImagesResponse>;
/**
 * Get File Variables
 */
export declare function getFileVariables(fileId: string): Promise<DesignVariable[]>;
/**
 * Extract Component Properties
 * Analyzes a Figma node to extract CSS-like properties
 */
export declare function extractComponentProperties(node: FigmaNode): Record<string, ComponentProperty>;
/**
 * Find Node by ID
 * Recursively searches the document tree for a node with the given ID
 */
export declare function findNodeById(root: FigmaNode, nodeId: string): FigmaNode | null;
/**
 * Get All Component Nodes
 * Extracts all COMPONENT type nodes from the document tree
 */
export declare function getAllComponentNodes(root: FigmaNode): FigmaNode[];
//# sourceMappingURL=figma.service.d.ts.map