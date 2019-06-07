/**
 * Routes are  cached
 * Directions are cached
 * SearchStops are cached
 * Arrivals are NOT CACHED.
 */

const RouteCache = require('./RouteCache');
module.exports = class CacheManager extends Map {
    constructor(iterable)
    {
        super(iterable);
        this._routeCacheManager = null;
    }

    set routeCacheManager(routes)
    {
        if(this._routeCacheManager === null || this._routeCacheManager === undefined)
        {
            this._routeCacheManager = new RouteCache();
        }
        else {
            throw new Exception("RouteCache already initialized.");
        }
    }
    get routeCacheManager()
    {
        return this._routeCacheManager;
    }
}