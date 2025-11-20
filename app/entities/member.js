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
 * An entity that represents a single member.
 */
class Member {
    /**
     * Create a new instance of Member.
     */
    constructor() {
        this._id = null;
        this._username = null;
        this._displayName = null;
        this._useDisplayName = false;
        this._emailAddress = null;
        this._passwordHash = null;
        this._localeId = null;
        this._themeId = null;
        this._dateTime = {};
        this._locked = {};
    }

    /**
     * Get the identifier of this member.
     * 
     * @returns {number} The member identifier.
     */
    get id() {
        return this._id;
    }

    /**
     * Set the identifier of this member.
     * 
     * @param {number} id - The member identifier.
     */
    set id(id) {
        this._id = id;
    }

    /**
     * Get the username for login.
     * 
     * @returns {string|null} The username.
     */
    get username() {
        return this._username;
    }

    /**
     * Set the username for login.
     * 
     * @param {string} username - The username.
     */
    set username(username) {
        this._username = username;
    }

    /**
     * Get the display name shown in UI.
     * 
     * @returns {string|null} The display name.
     */
    get displayName() {
        return this._displayName;
    }

    /**
     * Set the display name shown in UI.
     * 
     * @param {string} displayName - The display name.
     */
    set displayName(displayName) {
        this._displayName = displayName;
    }

    /**
     * Whether to use the display name instead of the username in UI.
     * 
     * @returns {boolean} True if display name should be used.
     */
    get useDisplayName() {
        return !!this._useDisplayName;
    }

    /**
     * Set whether to use the display name in UI.
     * 
     * @param {boolean} use - True to use displayName.
     */
    set useDisplayName(use) {
        this._useDisplayName = Boolean(use);
    }

    /**
     * Get the member's email address.
     * 
     * @returns {string|null} The email address.
     */
    get emailAddress() {
        return this._emailAddress;
    }

    /**
     * Set the member's email address.
     * 
     * @param {string} email - The email address.
     */
    set emailAddress(email) {
        this._emailAddress = email;
    }

    /**
     * Get the stored password hash.
     * 
     * @returns {string|null} The password hash.
     */
    get passwordHash() {
        return this._passwordHash;
    }

    /**
     * Set the stored password hash.
     * 
     * @param {string} hash - The password hash.
     */
    set passwordHash(hash) {
        this._passwordHash = hash;
    }

    /**
     * Get the locale identifier for the member.
     * 
     * @returns {number} The locale id.
     */
    get localeId() {
        return this._localeId;
    }

    /**
     * Set the locale identifier for the member.
     * 
     * @param {number} localeId - The locale id.
     */
    set localeId(localeId) {
        this._localeId = localeId;
    }

    /**
     * Get the theme identifier for the member (UI preference).
     * 
     * @returns {number} The theme id.
     */
    get themeId() {
        return this._themeId;
    }

    /**
     * Set the theme identifier for the member (UI preference).
     * 
     * @param {number} theme - The theme id.
     */
    set themeId(theme) {
        this._themeId = theme;
    }

    /**
     * Get the date/time metadata object.
     * 
     * @returns {Object} The dateTime object.
     */
    get dateTime() {
        return this._dateTime;
    }

    /**
     * Set the date/time metadata object.
     * 
     * @param {Object} dt - The dateTime object.
     */
    set dateTime(dt) {
        this._dateTime = dt || {};
    }

    /**
     * Get the locked state object.
     * 
     * @returns {Object} The locked object.
     */
    get locked() {
        return this._locked;
    }

    /**
     * Set the locked state object.
     * 
     * @param {Object} lk - The locked object.
     */
    set locked(lk) {
        this._locked = lk || {};
    }

    /**
     * Convert this Member entity into a vanilla javascript object.
     * 
     * @returns {Object} A vanilla javascript object representation of this Member entity.
     */
    toObject() {
        return {
            id: this._id ?? null,
            username: this._username ?? null,
            displayName: this._displayName ?? null,
            useDisplayName: this._useDisplayName ?? false,
            emailAddress: this._emailAddress ?? null,
            localeId: this._localeId ?? null,
            themeId: this._themeId ?? null,
            dateTime: this._dateTime ?? null,
            locked: this._locked ?? { locked: false },
        };  
    }

    /**
     * Convert a vanilla javascript object into a Member entity.
     * 
     * @param {Object} obj - A vanilla object representation of a Member entity.
     * @returns {Member} The Member entity converted from the vanilla javascript object representation.
     */
    fromObject(obj) {
        const member = new Member();

        member.id = obj.id ?? null;
        member.username = obj.username ?? null;
        member.displayName = obj.displayName ?? null;
        member.useDisplayName = obj.useDisplayName ?? false;
        member.emailAddress = obj.emailAddress ?? null;
        member.localeId = Number(obj.localeId) ?? null;
        member.themeId = Number(obj.themeId) ?? null;
        member.dateTime = obj.dateTime ? obj.dateTime : {};
        member.locked = obj.locked ? obj.locked : { locked: false };

        return member;
    }
}

module.exports = Member;