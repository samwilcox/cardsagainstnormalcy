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

const CacheInterface = require('../cacheInterface');
const toCache = require('../toCache');
const DatabaseProviderFactory = require('../../db/databaseProviderFactory');
const QueryBuilder = require('../../db/queryBuilder');
const LogService = require('../../../services/logService');
const InvalidParameterError = require('../../../errors/invalidParameterError');

/**
 * Concrete implementation of the CacheInterface for no caching.
 */
class NoCacheProvider extends CacheInterface {
    /**
     * Create a new instance of NoCacheProvider.
     */
    constructor() {
        super();
        this._cache = {};
        this._toCache = toCache();
        this._db = DatabaseProviderFactory.create();
        this._builder = new QueryBuilder();
    }

    /**
     * Build the cache.
     */
    async build() {
        try {
             LogService.log('Building the cache...', LogService.type.DEBUG);

             await Promise.all(this._toCache.map(async (item) => {
                if (!this._cache.hasOwnProperty(item)) {
                    await this.update(item);
                }
             }));
        } catch (error) {
            LogService.log(`The cache building process failed: ${error}.`, LogService.type.ERROR, { error });
            throw error;
        }
    }

    /**
     * Update a target (table or collection) in the cache.
     * 
     * @param {Target|string} target - The target to update cache for.
     */
    async update(target) {
        try  {
            const data = await this._db.query(this._builder
                .clear()
                .select()
                .from(target)
                .build()
            );

            if (!data || data.length == 0) {
                LogService.log(`No data returned for target: ${target}.`, LogService.type.WARNING, { target });
            }

            this._cache[target] = data;
        } catch (error) {
            LogService.log(`Failed to update cache for target: ${target}.`, LogService.type.ERROR, { error, target });
            throw error;
        }
    }

    /**
     * Update a list of targets (tables or collections) to update in the cache.
     * 
     * @param {Target[]|string[]} targets - A list of targets (tables or collections) to update in the cache.
     * @throws {InvalidParameterError} If the targets parameter is not an array.
     * @throws {Error} If the cache update process fails.
     */
    async updateAll(targets) {
        if (!Array.isArray(targets)) {
            throw new InvalidParameterError('Cache provider updayeAll() method targets parameter must be an array.', { targets });
        }

        for (const target of targets) {
            await this.update(target);
        }
    }

    /**
     * Get the cached data for a target (table or collection).
     * 
     * @param {Target|string} target - The target (table or collection) to get the cached data for.
     */
    get(target) {
        if (target in this._cache) {
            return this._cache[target];
        }

        return [];
    }

    /**
     * Get the cached data for the given targets (tables or collections).
     * 
     * @param {Object[]} targets - An object with key-value pairs for targets (tables or collections) to get cached data for.
     *                             Example:
     *                             ``` { members: Target.MEMBERS, sessions: Target.SESSIONS } ```
     * @throws {InvalidParameterError} If the targets parameter is not an object.
     */
    getAll(targets) {
        if (!targets || typeof targets !== 'object') {
            throw new InvalidParameterError('Cache provider getAll() method targets parameter must be an object.', { targets });
        }

        const list = {};

        for (const key in targets) {
            list[key] = this.get(targets[key]);
        }

        return list;
    }
}

module.exports = NoCacheProvider;