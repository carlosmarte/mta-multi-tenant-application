/**
 * Figma Component Inspector Frontend Module
 * Exposes functions to access the built frontend assets
 */

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Get the path to the frontend distribution directory
 * @returns {string} Absolute path to the frontend dist folder
 */
export function getStaticAssetsPath() {
  return join(__dirname, 'dist');
}

export default {
  getStaticAssetsPath
};