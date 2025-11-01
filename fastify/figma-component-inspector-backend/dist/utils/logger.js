/**
 * Logger Utility
 *
 * Provides structured logging with file output to ./logs/apps-figma-component-inspector/
 */
import fs from 'fs';
import path from 'path';
const LOG_DIR = path.join(process.cwd(), 'logs', 'apps-figma-component-inspector');
// Ensure log directory exists
try {
    fs.mkdirSync(LOG_DIR, { recursive: true });
}
catch (error) {
    console.warn('Could not create log directory:', error);
}
function formatLogEntry(entry) {
    const dataStr = entry.data ? ` | ${JSON.stringify(entry.data)}` : '';
    return `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}${dataStr}\n`;
}
function writeToFile(entry) {
    try {
        const date = new Date().toISOString().split('T')[0];
        const logFile = path.join(LOG_DIR, `figma-inspector-${date}.log`);
        const formatted = formatLogEntry(entry);
        fs.appendFileSync(logFile, formatted, 'utf8');
    }
    catch (error) {
        console.error('Failed to write to log file:', error);
    }
}
function createLogEntry(level, message, data) {
    return {
        timestamp: new Date().toISOString(),
        level,
        message,
        data,
    };
}
export const logger = {
    info(message, data) {
        const entry = createLogEntry('info', message, data);
        console.log(formatLogEntry(entry).trim());
        writeToFile(entry);
    },
    warn(message, data) {
        const entry = createLogEntry('warn', message, data);
        console.warn(formatLogEntry(entry).trim());
        writeToFile(entry);
    },
    error(message, data) {
        const entry = createLogEntry('error', message, data);
        console.error(formatLogEntry(entry).trim());
        writeToFile(entry);
    },
};
//# sourceMappingURL=logger.js.map