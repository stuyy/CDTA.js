const EventEmitter = require('events');
const Request = require('./RequestHandler');
const Constants = require('./Constants');

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
        if(field === 'time')
        {
            try {
                const response = await Request.get(this.token);
                return response;
            } 
            catch(ex)
            {
                return Promise.reject(ex);
            }
        }
    }
}