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
 * Any entity that represents a single Setting.
 */
class Setting {
    /**
     * Create a new instance of Setting.
     */
    constructor() {
        this._id = null;
        this._key = null;
        this._value = null;
        this._defaultValue = null;
        this._category = null;
        this._description = null;
    }

    /**
     * Get this setting's identifier.
     * 
     * @returns {number} The setting identifier.
     */
    get id() {
        return this._id;
    }

    /**
     * Set this setting's identifier.
     * 
     * @param {number} id - The setting identifier.
     */
    set id(id) {
        this._id = id;
    }

    /**
     * Get this setting's key name.
     * 
     * @returns {string} The key name.
     */
    get key() {
        return this._key;
    }

    /**
     * Set this setting's key name.
     * 
     * @param {string} key - The key name.
     */
    set key(key) {
        this._key = key;
    }

    /**
     * Get the value for this setting.
     * 
     * @returns {*} The value for this setting.
     */
    get value() {
        return this._value;
    }

    /**
     * Set the value for this setting.
     * 
     * @param {*} value - The value for this setting.
     */
    set value(value) {
        this._value = value;
    }

    /**
     * Get the default value for this setting.
     * 
     * @returns {*} The default value for this setting.
     */
    get defaultValue() {
        return this._defaultValue;
    }

    /**
     * Set the default value for this setting.
     * 
     * @param {*} defaultValue - The default value for this setting.
     */
    set defaultValue(defaultValue) {
        this._defaultValue = defaultValue;
    }

    /**
     * Get the category for this setting.
     * 
     * @returns {string} The category for this setting.
     */
    get category() {
        return this._category;
    }

    /**
     * Set the category for this setting.
     * 
     * @param {string} category - The category name for this setting.
     */
    set category(category) {
        this._category = category;
    }

    /**
     * Get the description for this setting.
     * 
     * @returns {string} The description of this setting.
     */
    get description() {
        return this._description;
    }

    /**
     * Set the description for this setting.
     * 
     * @param {string} description - The description of this setting.
     */
    set description(description) {
        this._description = description;
    }

    /**
     * Convert this Setting entity to a vanilla javascript object representation.
     * 
     * @returns {Object} A vanilla javascript object representation of this Setting entity.
     */
    toObject() {    
        return {
            id: this._id ?? null,
            key: this._key ?? null,
            value: this._value ?? null,
            defaultValue: this._defaultValue ?? null,
            category: this._category ?? null,
            description: this._description ?? null,
        };
    }

    /**
     * Convert a vanilla javascript object to a Setting entity.
     * 
     * @param {Object} obj - A vanilla javascript object to convert to a Setting entity.
     * @returns {Setting} The Setting entity.
     */
    fromObject(obj) {
        const setting = new Setting();

        setting.id = obj.id ? obj.id : null;
        setting.key = obj.key ? obj.key : null;
        setting.value = obj.value ? obj.value : null;
        setting.defaultValue = obj.defaultValue ? obj.defaultValue : null;
        setting.category = obj.category ? obj.category : null;
        setting.description = obj.description ? obj.description : null;

        return setting;
    }
}

module.exports = Setting;