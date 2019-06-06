module.exports = class Arrival {
    constructor(type = null, routeId = null, routeName = null, direction = null, tripId = null, minutes = null, time = null)
    {
        this.type = type;
        this.route_id = routeId;
        this.route_name = routeName;
        this.direction = direction;
        this.trip_id = tripId;
        this.arrival_time = time;
        this.arrival_minutes = minutes;
    }
} 