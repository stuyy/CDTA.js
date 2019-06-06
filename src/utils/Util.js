const { FIELDS } = require('./Constants');
const BusStop = require('../DataModels/BusStop');
const Collection = require('./Collection');
const Arrival = require('../DataModels/Arrival');
const Cache = require('../CacheStorage/Cache');
module.exports.getEndpointURL = function (BASE_URL, route, params)
{
    if(typeof params !== 'object')
        return BASE_URL + "&key=" + params;
    else
        return BASE_URL + route + "/" + build(params);
}

function build(arguments)
{
    if(arguments.length == 0)
        return;
    else if(arguments.length == 1)
        return "&key=" + arguments[0];
    else
    {
        let el = arguments.shift();
        if(arguments.length == 1)
            return el + build(arguments);
        else
            return el + "/" + build(arguments);
    }
}

module.exports.validate = function(field, ...args)
{
    if(FIELDS.hasOwnProperty(field.toUpperCase()))
    {
        switch(field)
            {
                case FIELDS.TIME:
                    return true;
                case FIELDS.ROUTES: 
                    return args.length == 0 || args.length == 1 ? true : false;
                case FIELDS.DIRECTIONS:
                    return args.length == 1 ? true : false;
                case FIELDS.SCHEDULES:
                    return args.length == 3 ? true : false;
                case FIELDS.STOPS:
                    return args.length == 2 ? true : false
                case FIELDS.NEARSTOPS:
                    return args.length == 2 || args.length == 3 ? true : false;
                case FIELDS.SEARCHSTOPS:
                    return args.length == 1 ? true : false;
                case FIELDS.SEARCH:
                    return args.length == 1 || args.length == 2 ? true : false;
                case FIELDS.ARRIVALS:
                    return args.length == 1 || args.length == 2 ? true : false;
                case FIELDS.ALERTS:
                    return true;
                default:
                    return false;
            }
    }
}

module.exports.createObject = function(type, response)
{
     // An array of key value pairs.
    if(type == FIELDS.ARRIVALS) // Ifroute is Arrival, create and return a BusStop object with arrivals collection set.
    {   
        const arrivals = response.arrivals;
        let arrivalsArray = [];
        for(var arrival in arrivals)
        {
            arrivals[arrival].date = response.date;
            var newArrival = new Arrival();
            let obj = Object.assign(newArrival, arrivals[arrival]);
            arrivalsArray.push([obj.trip_id, obj]);
        }
        let stop = new BusStop(response.stop_id, response.stop_name, response.schedule_type, new Collection(arrivalsArray));
        console.log(stop);
    }
}