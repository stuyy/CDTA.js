module.exports = class BusStop {
    /**
     * 
     * @param { the id of the Bus Stop } stopId 
     * @param { the name of the Bus Stop } stopName 
     * @param { the schedule type } type 
     */
    constructor(stopId, stopName, type)
    {
        this.stopId = stopId;
        this.stopName = stopName;
        this.type = type;
        Object.freeze(this);
    }

}