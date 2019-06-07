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
            set (routes) { 
                if(routes instanceof Map)
                {
                    console.log(routes + " is a Map!")
                    this._routeCacheManager = new RouteCache(routes);
                }
                else if(routes instanceof Object)
                {
                    console.log(routes + " is an Object!")
                    this._routeCacheManager = new RouteCache();
                    this._routeCacheManager.set(routes.route_id, routes);
                }
             },
            get () { return this._routeCacheManager; }
        });
    }
}