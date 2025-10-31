import type { DecoratorInfo, RegistrationResult, RegisterOptions } from './types.js';
export type { DecoratorInfo, RegistrationResult, RegisterOptions };
/**
 * Global registry for tracking Fastify decorator lifecycle
 *
 * This singleton tracks which plugin owns which decorator to prevent
 * duplicate registrations and provide better error messages.
 *
 * @example
 * ```typescript
 * import { DecoratorRegistry } from '@thinkeloquent/core-decorator-registry';
 *
 * // Try to register a decorator
 * const result = DecoratorRegistry.register({
 *   name: 'sendFile',
 *   owner: 'core-static-app',
 *   prefix: '/static/auth'
 * });
 *
 * if (!result.success) {
 *   console.log(`Decorator already registered by ${result.existingDecorator?.owner}`);
 * }
 * ```
 */
export declare class DecoratorRegistry {
    private static decorators;
    /**
     * Register a new decorator in the global registry
     *
     * @param options - Registration options
     * @returns Registration result with success status
     */
    static register(options: RegisterOptions): RegistrationResult;
    /**
     * Check if a decorator is registered
     *
     * @param name - Decorator name
     * @returns True if decorator exists in registry
     */
    static isRegistered(name: string): boolean;
    /**
     * Get information about a registered decorator
     *
     * @param name - Decorator name
     * @returns Decorator info or undefined if not registered
     */
    static getInfo(name: string): DecoratorInfo | undefined;
    /**
     * Get the owner of a decorator
     *
     * @param name - Decorator name
     * @returns Owner plugin name or undefined if not registered
     */
    static getOwner(name: string): string | undefined;
    /**
     * Get all registered decorators
     *
     * @returns Array of all decorator info
     */
    static getAll(): DecoratorInfo[];
    /**
     * Unregister a decorator (for testing purposes)
     *
     * @param name - Decorator name
     * @returns True if decorator was removed
     */
    static unregister(name: string): boolean;
    /**
     * Clear all registrations (for testing purposes)
     */
    static clear(): void;
}
//# sourceMappingURL=index.d.ts.map