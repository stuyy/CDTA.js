/**
 * Routes are  cached
 * Directions are cached
 * SearchStops are cached
 * Arrivals are NOT CACHED.
 */

const RouteCache = require('./RouteCache');
module.exports = class CacheManager {
    constructor()
    {
        Object.defineProperty(this, 'routeCacheManager', {
            set (routes) { this._routeCacheManager = new RouteCache(routes); },
            get () { return this._routeCacheManager; }
        });
        Object.defineProperty(this, 'isAllCached', {
            set(flag) { this._isAllCached = flag; },
            get() { return this._isAllCached; }
        });
    }
}