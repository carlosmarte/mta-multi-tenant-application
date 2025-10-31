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
export class DecoratorRegistry {
    static decorators = new Map();
    /**
     * Register a new decorator in the global registry
     *
     * @param options - Registration options
     * @returns Registration result with success status
     */
    static register(options) {
        const { name, owner, prefix, metadata } = options;
        // Check if already registered
        if (this.decorators.has(name)) {
            const existing = this.decorators.get(name);
            return {
                success: false,
                existingDecorator: existing,
                message: `Decorator '${name}' already registered by '${existing.owner}' at ${existing.registeredAt.toISOString()}`,
            };
        }
        // Register new decorator
        const info = {
            name,
            owner,
            registeredAt: new Date(),
            prefix,
            metadata,
        };
        this.decorators.set(name, info);
        return {
            success: true,
            message: `Decorator '${name}' successfully registered by '${owner}'`,
        };
    }
    /**
     * Check if a decorator is registered
     *
     * @param name - Decorator name
     * @returns True if decorator exists in registry
     */
    static isRegistered(name) {
        return this.decorators.has(name);
    }
    /**
     * Get information about a registered decorator
     *
     * @param name - Decorator name
     * @returns Decorator info or undefined if not registered
     */
    static getInfo(name) {
        return this.decorators.get(name);
    }
    /**
     * Get the owner of a decorator
     *
     * @param name - Decorator name
     * @returns Owner plugin name or undefined if not registered
     */
    static getOwner(name) {
        return this.decorators.get(name)?.owner;
    }
    /**
     * Get all registered decorators
     *
     * @returns Array of all decorator info
     */
    static getAll() {
        return Array.from(this.decorators.values());
    }
    /**
     * Unregister a decorator (for testing purposes)
     *
     * @param name - Decorator name
     * @returns True if decorator was removed
     */
    static unregister(name) {
        return this.decorators.delete(name);
    }
    /**
     * Clear all registrations (for testing purposes)
     */
    static clear() {
        this.decorators.clear();
    }
}
//# sourceMappingURL=index.js.map