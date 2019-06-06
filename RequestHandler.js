const URL = "http://api.cdta.org/api/v1/?request=ping&key=" + process.env.TOKEN;
const EventEmitter = require('events');
const fetch = require('node-fetch');
const { API, FIELDS } = require('./Constants');
const utils = require('./utils/Util');

module.exports = class RequestHandler extends EventEmitter {

    static async checkStatus(token)
    {
        const response = await fetch(API + 'ping&key=' + token);
        if(response.status == 200)
        {
            const json = JSON.parse(await response.text());
        }
        else if(response.status == 401)
            throw new Error("Invalid Credentials");
    }
    static async get(field, token, ...args)
    {
        var endpoint = utils.getEndpointURL(API, field, token, ...args);
        var response = null;
        switch(field)
        {
            case FIELDS.TIME:
                response = await fetch(endpoint);
                if(response.status == 200)
                    return JSON.parse(await response.text());
                else if(response.status == 401)
                    return Promise.reject(new Error("Invalid API Key"));
            case FIELDS.ROUTES:
                if(args.length == 0) // Return all routes.
                {
                    response = await fetch(endpoint);
                    return JSON.parse(await response.text());
                }
                else if(args.length == 1)
                {
                    response = await fetch(endpoint);
                    return JSON.parse(await response.text());
                }
                break;
            case FIELDS.DIRECTIONS:
                response = await fetch(endpoint);
                return JSON.parse(await response.text());
            case FIELDS.SCHEDULES:
                return JSON.parse(await (await fetch(endpoint)).text());
            case FIELDS.STOPS:
                return JSON.parse(await (await fetch(endpoint)).text());
            case FIELDS.NEAR_STOPS:
                return JSON.parse(await (await fetch(endpoint)).text());
            case FIELDS.SEARCH_STOPS:
                return JSON.parse(await (await fetch(endpoint)).text());
            case FIELDS.SEARCH:
                
                break;
            case FIELDS.ARRIVALS:
                break;
        }
    }
}