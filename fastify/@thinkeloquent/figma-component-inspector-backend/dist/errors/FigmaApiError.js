/**
 * Figma API Error
 *
 * Custom error class for Figma API failures with detailed error information
 */
export class FigmaApiError extends Error {
    statusCode;
    endpoint;
    missingScopes;
    originalError;
    constructor(params) {
        super(params.message);
        this.name = 'FigmaApiError';
        this.statusCode = params.statusCode;
        this.endpoint = params.endpoint;
        this.missingScopes = params.missingScopes;
        this.originalError = params.originalError;
        // Maintains proper stack trace for where error was thrown
        Error.captureStackTrace(this, this.constructor);
    }
    /**
     * Check if this is a scope/permission error
     */
    isScopeError() {
        return this.statusCode === 403 && !!this.missingScopes && this.missingScopes.length > 0;
    }
    /**
     * Get user-friendly error message
     */
    getUserMessage() {
        if (this.isScopeError()) {
            const scopeList = this.missingScopes.join(', ');
            return `Figma API access denied. The FIGMA_TOKEN is missing required scope(s): ${scopeList}. Please regenerate your token with these scopes at https://www.figma.com/settings`;
        }
        if (this.statusCode === 401) {
            return 'Figma API authentication failed. Please check your FIGMA_TOKEN is valid.';
        }
        if (this.statusCode === 404) {
            return 'Figma resource not found. Please check the file ID or node ID.';
        }
        if (this.statusCode === 429) {
            return 'Figma API rate limit exceeded. Please try again later.';
        }
        return this.message;
    }
}
/**
 * Parse Figma API error response to extract missing scopes
 */
export function parseFigmaErrorScopes(errorMessage) {
    // Figma API returns scope errors in format: "Invalid scope(s): ... This endpoint requires the file_variables:read scope"
    const scopeMatch = errorMessage.match(/requires the ([\w:_,\s]+) scope/i);
    if (scopeMatch) {
        const scopesText = scopeMatch[1];
        // Extract individual scopes (they might be comma-separated or single)
        const scopes = scopesText
            .split(',')
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
        return scopes;
    }
    // Alternative pattern: "Invalid scope(s): scope1, scope2, scope3"
    const invalidScopeMatch = errorMessage.match(/Invalid scope\(s\):\s*([^.]+)/i);
    if (invalidScopeMatch) {
        const scopesText = invalidScopeMatch[1];
        const scopes = scopesText
            .split(',')
            .map((s) => s.trim())
            .filter((s) => s.length > 0 && s.includes(':'));
        return scopes.length > 0 ? scopes : undefined;
    }
    return undefined;
}
//# sourceMappingURL=FigmaApiError.js.map