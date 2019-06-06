const Cache = require('./Cache');

class RouteCache extends Cache {
    constructor(iterable)
    {
        super(iterable);
    }
}

module.exports = RouteCache;