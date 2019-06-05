const EventEmitter = require('events');
const Request = require('./RequestHandler');
const { API, FIELDS } = require('./Constants');

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
        Request.checkStatus().then(() => {
            this.emit("authorized");
        }).catch(err => this.emit('error', err));
    }
    async get(field, ...args)
    {
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
                case FIELDS.STOPS:
                    break;
                case FIELDS.NEAR_STOPS:
                    break;
                case FIELDS.SEARCH_STOPS:
                    break;
                case FIELDS.SEARCH:
                    break;
                case FIELDS.ARRIVALS:
                    break;
            }
        }
        catch(ex)
        {
            return Promise.reject(ex);
        }
    }
}