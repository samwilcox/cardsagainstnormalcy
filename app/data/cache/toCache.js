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

const Target = require("../../enums/target");

/**
 * Returns the list of targets (tables or collections) to cache.
 * 
 * @returns {string[]} The list of targets (tables or collections) to cache.
 */
const toCache = () => {
    return [
        Target.LOCALES,
        Target.THEMES,
        Target.SESSIONS,
        Target.SETTINGS,
        Target.MEMBERS,
        Target.MEMBER_DEVICES
    ];  
};

module.exports = toCache;