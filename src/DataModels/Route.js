module.exports = class Route {
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
        this.arrivals = new Collection(arrivals);
        Object.freeze(this);
    }
}