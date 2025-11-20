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
 * Interface contract for cache providers to implement.
 */
class CacheInterface {
    /**
     * Build the cache.
     * This method MUST be implemented by a cache provider.
     * 
     * @throws {Error} If this method is not implemented by a cache provider.
     */
    build() {
        throw new Error('build() method must be implemented.');
    }

    /**
     * Update a target (table or collection) in the cache.
     * This method MUST be implemented by a cache provider.
     * 
     * @param {Target|string} target - The target to update cache for.
     * @throws {Error} If this method is not implemented by a cache provider.
     */
    update(target) {
        throw new Error('update() method must be implemented.');
    }

    /**
     * Update a list of targets (tables or collections) to update in the cache.
     * This method MUST be implemented by a cache provider.
     * 
     * @param {Target[]|string[]} targets - A list of targets (tables or collections) to update in the cache.
     * @throws {Error} If this method is not implemented by a cache provider. 
     */
    updateAll(targets) {
        throw new Error('updateAll() method must be implemented.');
    }

    /**
     * Get the cached data for a target (table or collection).
     * This method MUST be implemented by a cache provider.
     * 
     * @param {Target|string} target - The target (table or collection) to get the cached data for.
     * @throws {Error} If this method is not implemented by a cache provider. 
     */
    get(target) {
        throw new Error('get() method must be implemented.');
    }

    /**
     * Get the cached data for the given targets (tables or collections).
     * This method MUST be implemented by a cache provider.
     * 
     * @param {Object[]} targets - An object with key-value pairs for targets (tables or collections) to get cached data for.
     *                             Example:
     *                             ``` { members: Target.MEMBERS, sessions: Target.SESSIONS } ```
     * @throws {Error} If this method is not implemented by a cache provider. 
     */
    getAll(targets) {
        throw new Error('getAll() method must be implemented.');
    }
}

module.exports = CacheInterface;