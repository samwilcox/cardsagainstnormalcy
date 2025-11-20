/**
 * Cards Against Normalcy
 * A NodeJS multiplayer game based on the original Cards Against Humanity.
 * 
 * @author  Sam Wilcox
 * @email   sam@cardsagainstnormalcy.com
 * @github  https://github.com/samwilcox/cardsagainstnormalcy
 * @website https://www.cardsagainstnormalcy.com
 * 
 * Cards Against Normalcy is released under the GNU v3 license.
 * For further details, see the licence at:
 * https://license.cardsagainstnormalcy.com
 */

const LogType = require('../enums/logType');
const UnsupportedError = require('../errors/unsupportedError');

/**
 * Service for logging messages.
 */
class LogService {
    static _instance = null;

    /**
     * Get the singleton instance of LogService.
     * 
     * @returns {LogService} The singleton instance of LogService.
     */
    static getInstance() {
        if (!LogService._instance) {
            LogService._instance = new LogService();
        }

        return LogService._instance;
    }

    /**
     * Log a new message.
     * 
     * @param {string} msg - The message to log.
     * @param {LogType} [type=LogType.INFO] - The type of log you are logging (default is LogType.INFO). 
     * @param {Object} [data={}] - Optional metadata for this log call. 
     */
    log(msg, type = LogType.INFO, data = {}) {
        const logToConsole = false;
        const info = process.env.INFO.toLowerCase() === 'true';
        const debug = process.env.DEBUG.toLowerCase() === 'true';
        const warning = process.env.WARNING.toLowerCase() === 'true';
        const error = process.env.ERROR.toLowerCase() === 'true';

        switch (type) {
            case LogType.INFO:
                if (info) logToConsole = true;
                break;
            case LogType.DEBUG:
                if (debug) logToConsole = true;
                break;
            case LogType.WARNING:
                if (warning) logToConsole = true;
                break;
            case LogType.ERROR:
                if (error) logToConsole = true;
                break;
            default:
                throw new UnsupportedError(`Unsupported log type: ${type.toString()}.`);
        }

        const RESET = "\x1b[0m";

        const COLORS = {
            INFO: "\x1b[36m",
            DEBUG: "\x1b[90m",
            WARNING: "\x1b[33m",
            ERROR: "\x1b[31m",
            TIMESTAMP: "\x1b[90m",
        };

        const timestamp = () => {
            const now = new Date();
            return now
                .toISOString()
                .replace("T", " ")
                .replace(/\..+/, "");
        };

        if (logToConsole) {
            const toConsole = `${COLORS.TIMESTAMP}[${timestamp}]${RESET}: ${msg}`;

            switch (type) {
                case LogType.DEBUG:
                    console.debug(`${COLORS.DEBUG}[DEBUG]${RESET} ${toConsole}`);
                    break;
                case LogType.ERROR:
                    console.error(`${COLORS.ERROR}[ERROR]${RESET} ${toConsole}`);
                    break;
                case LogType.INFO:
                    console.info(`${COLORS.INFO}[INFO]${RESET} ${toConsole}`);
                    break;
                case LogType.WARNING:
                    console.warn(`${COLORS.WARNING}[WARNING]${RESET} ${toConsole}`);
                    break;
                default:
                    throw new UnsupportedError(`Unsupported log type: ${type.toString()}.`);
            }
        }
    }

    /**
     * Get the log type enumerations.
     * 
     * @returns {LogType} The log type enumerations.
     */
    get type() {
        return LogType;
    }
}

module.exports = LogService.getInstance();