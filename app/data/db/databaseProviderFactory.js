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

const UnsupportedError = require('../../errors/unsupportedError');
const SqliteProvider = require('./providers/sqliteProvider');

/**
 * Factory class for creating instances of different database providers,
 */
class DatabaseProviderFactory {
    static _instance = null;

    /**
     * Create an instance of a database provider cased on the set type.
     * 
     * @returns {DatabaseInterface} An instance of the appropriate database provider.
     * @throws {UnsupportedError} If the database provider is not supported.
     */
    static create() {
        if (DatabaseProviderFactory._instance !== null) {
            return DatabaseProviderFactory._instance;
        }

        switch (process.env.DATABASE_PROVIDER.toLowerCase()) {
            case 'sqlite':
                DatabaseProviderFactory._instance = new SqliteProvider();
                break;
            default:
                throw new UnsupportedError(`Unsupported database provider: '${process.env.DATABASE_PROVIDER}.`, { DATABASE_PROVIDER: process.env.DATABASE_PROVIDER });
        }

        return DatabaseProviderFactory._instance;
    }
}

module.exports = DatabaseProviderFactory;