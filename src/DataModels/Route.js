/**
 * Route is a class that contains STATIC data, and never needs to be updated over time UNLESS the server manually updates it.
 * Upon the first API Call, every Route will be cached with a Map to preserve API calls.
 * This is useful if the user queries responses that include basic route information, but instead will include extra properties.
 * The Arrival class containts an instance field called "route" which is a Route data type.
 */

module.exports = class Route {
    /**
     * 
     * @param {*} routeId 
     * @param {*} routeName 
     * @param {*} routeType 
     * @param {*} description 
     * @param {*} routeUrl 
     * @param {*} scheduleUrl 
     * @param {*} mapKmlUrl 
     * @param {*} mapImageUrl 
     * @param {*} routeColor 
     * @param {*} routeTextColor 
     * @param {*} serviceDays 
     */
    constructor(routeId, routeName, routeType, description, routeUrl, scheduleUrl, mapKmlUrl, mapImageUrl, routeColor, routeTextColor, serviceDays, arrivals = null)
    {
        this.routeId = routeId;
        this.routeName = routeName;
        this.routeType = routeType;
        this.description = description;
        this.routeUrl = routeUrl;
        this.scheduleUrl = scheduleUrl;
        this.mapKmlUrl = mapKmlUrl;
        this.mapImageUrl = mapImageUrl;
        this.routeColor = routeColor;
        this.routeTextColor = routeTextColor;
        this.serviceDays = serviceDays;
        Object.freeze(this);
    }
}