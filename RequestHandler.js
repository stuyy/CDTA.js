const URL = "http://api.cdta.org/api/v1/?request=ping&key=" + process.env.TOKEN;
const EventEmitter = require('events');
const fetch = require('node-fetch');

module.exports = class RequestHandler extends EventEmitter {

    static async checkStatus()
    {
        const response = await fetch(URL);
        if(response.status == 200)
        {
            const json = JSON.parse(await response.text());
        }
        else
            throw new Error("Invalid Credentials");
    }
}