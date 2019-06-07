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
        this.route_id = routeId;
        this.route_name = routeName;
        this.route_type = routeType;
        this.route_description = description;
        this.route_url = routeUrl;
        this.schedule_url = scheduleUrl;
        this.map_kml_url = mapKmlUrl;
        this.map_image_url = mapImageUrl;
        this.route_color = routeColor;
        this.route_text_color = routeTextColor;
        this.service_days = serviceDays;
    }
}