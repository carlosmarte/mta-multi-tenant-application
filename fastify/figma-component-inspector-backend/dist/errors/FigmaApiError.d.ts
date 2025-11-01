/**
 * Figma API Error
 *
 * Custom error class for Figma API failures with detailed error information
 */
export declare class FigmaApiError extends Error {
    readonly statusCode: number;
    readonly endpoint: string;
    readonly missingScopes?: string[];
    readonly originalError?: any;
    constructor(params: {
        message: string;
        statusCode: number;
        endpoint: string;
        missingScopes?: string[];
        originalError?: any;
    });
    /**
     * Check if this is a scope/permission error
     */
    isScopeError(): boolean;
    /**
     * Get user-friendly error message
     */
    getUserMessage(): string;
}
/**
 * Parse Figma API error response to extract missing scopes
 */
export declare function parseFigmaErrorScopes(errorMessage: string): string[] | undefined;
//# sourceMappingURL=FigmaApiError.d.ts.map