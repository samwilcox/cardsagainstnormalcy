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

/**
 * An error to throw when an error occurs with the database.
 */
class DatabaseError extends Error {
    /**
     * Create a new instance of DatabaseError.
     * 
     * @param {string} message - The error message. 
     * @param {Object} [data={}] - Optional error metadata. 
     */
    constructor(message, data = {}) {
        super(message);
        this.name = this.constructor.name;
        this.data = data;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = DatabaseError;