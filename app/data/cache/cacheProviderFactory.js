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

const NoCacheProvider = require('./providers/noCacheProvider');

/**
 * Factory class for creating instances of cache providers.
 */
class CacheProviderFactory {
    static _instance = null;

    /**
     * Create an instance of a cache provider based on the set type.
     * 
     * @returns {CacheInterface} An instance of the appropiate cache provider.
     */
    static create() {
        if (CacheProviderFactory._instance !== null) {
            return CacheProviderFactory._instance;
        }

        const enabled = process.env.CACHE_ENABLED.toLowerCase() === 'true';

        if (enabled) {
            switch (process.env.CACHE_METHOD.toLowerCase()) {
                default:
                    CacheProviderFactory._instance = new NoCacheProvider();
                    break;
            }
        } else {
            CacheProviderFactory._instance = new NoCacheProvider();
        }

        return CacheProviderFactory._instance;
    }
}

module.exports = CacheProviderFactory;