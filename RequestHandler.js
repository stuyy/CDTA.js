const URL = "http://api.cdta.org/api/v1/?request=ping&key=" + process.env.TOKEN;
const EventEmitter = require('events');
const fetch = require('node-fetch');
const Constants = require('./Constants');

module.exports = class RequestHandler extends EventEmitter {

    static async checkStatus()
    {
        const response = await fetch(URL);
        if(response.status == 200)
        {
            const json = JSON.parse(await response.text());
        }
        else if(response.status == 401)
            throw new Error("Invalid Credentials");
    }
    static async get(token)
    {
        const response = await fetch(Constants.API + 'time' + '&key=' + token);
        if(response.status == 200)
            return JSON.parse(await response.text());
        else if(response.status == 401)
            return Promise.reject(new Error("Invalid API Key"));
    }
}