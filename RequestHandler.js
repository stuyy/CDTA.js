const URL = "http://api.cdta.org/api/v1/?request=ping&key=" + process.env.TOKEN;
const EventEmitter = require('events');
const fetch = require('node-fetch');
const { API, FIELDS } = require('./Constants');

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
    static async get(field, token, ...args)
    {
        var response = null;
        switch(field)
        {
            case FIELDS.TIME:
                response = await fetch(API + 'time' + '&key=' + token);
                if(response.status == 200)
                    return JSON.parse(await response.text());
                else if(response.status == 401)
                    return Promise.reject(new Error("Invalid API Key"));
            case FIELDS.ROUTES:
                response = await fetch(API + 'routes/12' + '&key=' + token);
                return JSON.parse(await response.text());
                break;
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
}