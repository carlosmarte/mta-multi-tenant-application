/**
 * Helper functions for creating Ok and Err results
 * These provide a functional-style API for Result pattern
 */
import { Ok, Err } from './result.js';
/**
 * Creates a successful Result containing a value (lowercase helper)
 * @param value The value to wrap in Ok
 * @returns Ok result containing the value
 */
export function ok(value) {
    return new Ok(value);
}
/**
 * Creates a failed Result containing an error (lowercase helper)
 * @param error The error to wrap in Err
 * @returns Err result containing the error
 */
export function err(error) {
    return new Err(error);
}
//# sourceMappingURL=result-helpers.js.map