const EventEmitter = require('events');
const Request = require('./RequestHandler');

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
}