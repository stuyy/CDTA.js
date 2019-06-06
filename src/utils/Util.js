const { FIELDS } = require('./Constants');
const BusStop = require('../DataModels/BusStop');

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

module.exports.createAllRoutes = function(response)
{
    
}