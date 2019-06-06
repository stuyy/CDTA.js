module.exports = class Arrival {
    constructor(stopId, stopName, type, routeId, routeName, minutes, time)
    {
        this.stopId = stopId;
        this.stopName = stopName;
        this.type = type;
        this.routeId = routeId;
        this.routeName = routeName;
        this.minutes = minutes;
        this.time = time;
        
        Object.freeze(this);
    }
}