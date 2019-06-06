/**
 * Routes are  cached
 * Directions are cached
 * SearchStops are cached
 * Arrivals are NOT CACHED.
 */
module.exports = class Cache extends Map {
    constructor(iterable)
    {
        super(iterable);
    }
    save()
    {

    }
}