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
 * The interface contract for database providers.
 */
class DatabaseInterface {
    /**
     * Establish connection to the database server.
     * This method MUST be implemented by a database provider.
     * 
     * @throws {Error} If this method has not been implemented by a database provider.
     */
    connect() {
        throw new Error('connect() method must be implemented.');
    }

    /**
     * Executes a query on the database.
     * This method MUST be implemented by a database provider.
     * 
     * @param {Object} sql - The SQL query object:
     *                       { query: 'SQL statement', values: [] }
     * @returns {Promise} A promise that resolves with the result of the query.
     * @throws {Error} If this method has not been implemented by a database provider. 
     */
    query(sql) {
        throw new Error('query() method must be implemented.');
    }

    /**
     * Disconnect from the database server.
     * This method MUST be implemented by a database provider.
     * 
     * @throws {Error} If this method has not been implemented by a database provider.
     */
    disconnect() {
        throw new Error('disconnect() method must be implemented.');
    }
}

module.exports = DatabaseInterface;