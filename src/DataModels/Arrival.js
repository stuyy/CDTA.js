class Arrival {
    /**
     * 
     * @param { The service type - WEEKDAY, SATURDAY, SUNDAY } type 
     * @param { The route identifier } routeId 
     * @param { The route name } routeName 
     * @param { The direction it is headed towards} direction 
     * @param { The trip identifier } tripId 
     * @param { Total minutes until arrival } minutes 
     * @param { The time of arrival (Current time + minutes)} time 
     */
    constructor(type = null, date = null, direction = null, tripId = null, minutes = null, time = null)
    {
        this.type = type;
        this.date = date;
        this.direction = direction;
        this.trip_id = tripId;
        this.arrival_time = time;
        this.arrival_minutes = minutes;
        // Object.defineProperty(this, 'wtf', {
        //     value: function() { return this.trip_id; }
        // })
    }
    
};

module.exports = Arrival;