const Arrival = require('./Arrival');
const Collection = require('../utils/Collection');

module.exports = class BusStop {
    /**
     * 
     * @param { the id of the Bus Stop } stopId 
     * @param { the name of the Bus Stop } stopName 
     * @param { the schedule type } type 
     */
    constructor(stopId, stopName, type, arrivals)
    {
        this.stopId = stopId;
        this.stopName = stopName;
        this.type = type;
        this.arrivals = arrivals;
        Object.freeze(this);
    }
    
}