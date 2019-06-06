const EventEmitter = require('events');
const Request = require('./Requests/RequestHandler');
const { BASE_URL, FIELDS } = require('./utils/Constants');
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
        if(flag)
        {
            var response = await Request.get(field, this.token, args);
            utils.createAllRoutes(response);
            return response;
        }
        else 
            return Promise.reject('no');
    }
}