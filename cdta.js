const EventEmitter = require('events');
const Request = require('./RequestHandler');
const { API, FIELDS } = require('./Constants');
const utils = require('./utils/Util');

module.exports = class CDTAClient extends EventEmitter {
    constructor(token = null)
    {
        super();
        if(token)
        {
            this.token = token;
            this.authorize();
        }
        else
            this.emit('error', new Error("No token provided."));
    }
    authorize()
    {
        Request.checkStatus(this.token).then(() => {
            this.emit("authorized");
        }).catch(err => this.emit('error', err));
    }
    async get(field, ...args)
    {
        var flag = utils.validate(field, ...args);
        console.log(flag, field);
        if(flag) return Promise.resolve('yes');
        else return Promise.reject('no');
        process.exit(0);
        try
        {
            var response = null;
            switch(field)
            {
                case FIELDS.TIME:
                    response = await Request.get(FIELDS.TIME, this.token);
                    return response;
                /**
                 * Params:
                 * route_id? - route identifier
                 */
                case FIELDS.ROUTES: 
                    if(args.length == 0)
                        response = await Request.get(FIELDS.ROUTES, this.token);
                    else if(args.length == 1)
                        response = await Request.get(FIELDS.ROUTES, this.token, args[0]);
                    else 
                        return Promise.reject("Too many args.");
                    return response;
                /**
                 * Params: 
                 *  route_id - Route identifier 
                 *  key - api key 
                 */
                case FIELDS.DIRECTIONS:
                    if(args.length == 0)
                        return Promise.reject("No route_id specified.");
                    else if(args.length == 1)
                        return await Request.get(FIELDS.DIRECTIONS, this.token, args[0]);
                    else
                        return Promise.reject("Invalid arguments provided.");
                /**
                 * Params:
                 * route_id - Route Identifier
                 * service_type - Service type for route (Weekday, Saturday, Sunday)
                 * direction_id - direction of route (0 or 1)
                 */
                case FIELDS.SCHEDULES:
                    if(args.length != 3)
                        return Promise.reject("Must specify route_id, service_type, and direction_id");
                    else
                        return await Request.get(FIELDS.SCHEDULES, this.token, args[0], args[1], args[2]);
                /**
                 * Params:
                 * route_id? - Route Identifier
                 * direction? - Direction for route
                 * NOTE: If no params are specified, call endpoint and cache the data.
                 */
                case FIELDS.STOPS:
                    if(args.length != 2)
                        return Promise.reject("Must specify route_id, direction_id");
                    else
                        return await Request.get(FIELDS.STOPS, this.token, args[0], args[1])
                /**
                 * Params:
                 * latitude - Latitude of area
                 * longitude - longitude of area
                 * number_of_stops? - total stops to return, default 10
                 */
                case FIELDS.NEAR_STOPS:
                    if(args.length == 2) // User only specified latitude and longitude
                        return await Request.get(FIELDS.NEAR_STOPS, this.token, args[0], args[1], 10);
                    else if(args.length == 3)
                        return await Request.get(FIELDS.NEAR_STOPS, this.token, args[0], args[1], args[2]);
                    else
                        return Promise.reject("Invalid amount of arguments. Must provide latitude, longitude, and/or number_of_stops");
                
                /**
                 * Params:
                 * search_term - text or number to be searched for
                 */
                case FIELDS.SEARCH_STOPS:
                    if(args.length != 1)
                        return Promise.reject("Must provide a search term");
                    else
                        return await Request.get(FIELDS.SEARCH_STOPS, this.token, args[0]);

                /**
                 * Params:
                 * search_term - text or number to search for, e.g: routes, stops, landmarks
                 * result_count? - amount of items to return, default is all
                 */
                case FIELDS.SEARCH:
                    if(args.length ==  1)
                        return await Request.get(FIELDS.SEARCH, this.token, args[0]);
                    else if(args.length == 2)
                        return await Request.get(FIELDS.SEARCH, this.tokens, args[0], args[1]);
                    else
                        return Promise.reject("Invalid arguments. Must provide search_term, and/or result_count");
                /**
                 * Params:
                 * stop_id - stop identifier
                 * number_of_arrivals? - amount of arrivals to return per route, default 5
                 */
                case FIELDS.ARRIVALS:
                    if(args.length == 1)
                        return await Request.get(FIELDS.ARRIVALS, this.token, args[0]);
                    else
                        return await Request.get(FIELDS.ARRIVALS, this.tokens, args[0], args[1]);
                /**
                 * No params
                 */
                case FIELDS.ALERTS:
                    return await Request.get(FIELDS.ALERTS, this.token);
                default:
                    console.log("Nope.");
                    break;
            }
        }
        catch(ex)
        {
            return Promise.reject(ex);
        }
    }
}