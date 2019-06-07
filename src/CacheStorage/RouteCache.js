
class RouteCache extends Map {
    constructor(iterable)
    {
        super(iterable);
        Object.defineProperty(this, 'isAllCached', {
            set(flag) { 
                console.log("I'm the Route Cache");
                this._isAllCached = flag;
            },
            get() { return this._isAllCached; }
        })
    }
    
}

module.exports = RouteCache;