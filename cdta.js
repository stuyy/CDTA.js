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
                case FIELDS.ROUTES:
                    if(args.length == 0)
                        response = await Request.get(FIELDS.ROUTES, this.token);
                    else if(args.length == 1)
                        response = await Request.get(FIELDS.ROUTES, this.token, args[0]);
                    else 
                        return Promise.reject("Too many args.");
                    return response;
                case FIELDS.DIRECTIONS:
                    break;
                case FIELDS.SCHEDULES:
                    break;
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