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

const sqlite3 = require('sqlite3');
const DatabaseInterface = require('../databaseInterface');
const LogService = require('../../../services/logService');
const DatabaseError = require('../../../errors/databaseError');

/**
 * Concrete implementation for SQLite provider.
 */
class SqliteProvider extends DatabaseInterface {
    /**
     * Create a new instance of SqliteProvider.
     */
    constructor() {
        super();
        this._db = null;
        this._prefix = process.env.SQLITE_TABLE_PREFIX;
    }

    /**
     * Establish connection to the database server.
     */
    connect() {
        const dbPath = process.env.SQLITE_DATABASE_PATH || './database.sqlite';

        return new Promise((resolve, reject) => {
            this._db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, sqlite3.OPEN_CREATE, error => {
                if (error) {
                    LogService.log(`Failed to connect to the SQLite database: ${error}.`, LogService.type.ERROR, { error });
                    return reject(error);
                }

                LogService.log('Connected to the SQLite database', LogService.type.DEBUG);
                resolve();
            });
        });
    }

    /**
     * Executes a query on the database.
     * 
     * @param {Object} sql - The SQL query object:
     *                       { query: 'SQL statement', values: [] }
     * @returns {Promise} A promise that resolves with the result of the query.
     */
    query(sql) {
        return new Promise((resolve, reject) => {
            if (!this._db) {
                return reject(new DatabaseError('Database not connected. Call connect() first.', { sql }));
            }

            if (!sql.query || typeof sql.query !== 'string') {
                return reject(new DatabaseError('Invalid SQL query string.', { sql }));
            }

            const q = sql.query.trim();
            const params = sql.values ?? [];
            const isSelect = q.toUpperCase().startsWith('SELECT');

            if (isSelect) {
                this._db.all(q, params || [], (error, rows) => {
                    if (error) {
                        LogService.log(`Query error: ${error}.`, LogService.type.ERROR, { sql, error });
                        return reject(error);
                    }

                    resolve(rows);
                 });
            } else {
                this._db.run(q, params || [], function(error) {
                    if (error) {
                        LogService.log(`Query error: ${error}.`, LogService.type.ERROR, { sql, error });
                        return reject(error);
                    }
                });

                return resolve({ lastID: this.lastID, changes: this.changes });
            }
        });
    }

    /**
     * Disconnect from the database server.
     */
    disconnect() {
        return new Promise((resolve, reject) => {
            if (this._db) {
                this._db.close(error => {
                    if (error) {
                        LogService.log(`Failed to close the SQLite database connection: ${error}.`, LogService.type.ERROR, { error });
                        return reject(error);
                    }

                    LogService.log('Disconnected from the SQLite database.', LogService.type.DEBUG);
                    resolve();
                });
            } else {
                return reject(new DatabaseError('No active connections to close.'));
            }
        });
    }
}

module.exports = SqliteProvider;