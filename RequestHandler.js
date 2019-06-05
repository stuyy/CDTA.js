const URL = "http://api.cdta.org/api/v1/?request=ping&key=" + process.env.TOKEN;
const EventEmitter = require('events');
const fetch = require('node-fetch');
const { API, FIELDS } = require('./Constants');

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
        var response = null, url = null;
        switch(field)
        {
            case FIELDS.TIME:
                response = await fetch(API + 'time' + '&key=' + token);
                if(response.status == 200)
                    return JSON.parse(await response.text());
                else if(response.status == 401)
                    return Promise.reject(new Error("Invalid API Key"));
            case FIELDS.ROUTES:
                if(args.length == 0) // Return all routes.
                {
                    response = await fetch(API + 'routes' + '&key=' + token);
                    return JSON.parse(await response.text());
                }
                else if(args.length == 1)
                {
                    response = await fetch(API + 'routes/' + args[0] + '&key=' + token);
                    return JSON.parse(await response.text());
                }
                break;
            case FIELDS.DIRECTIONS:
                url = API + FIELDS.DIRECTIONS + "/" + args[0] + "&key=" + token;
                response = await fetch(url);
                return JSON.parse(await response.text());
                break;
            case FIELDS.SCHEDULES:
                url = API + FIELDS.SCHEDULES + "/" + args[0] + "/" + args[1] + "/" + args[2] + "&key=" + token;
                return JSON.parse(await (await fetch(url)).text());
            case FIELDS.STOPS:
                url = API + FIELDS.STOPS + "/" + args[0] + "/" + args[1] + "&key=" + token;
                return JSON.parse(await (await fetch(url)).text());
            case FIELDS.NEAR_STOPS:
                url = API + FIELDS.NEAR_STOPS + "/" + args[0] + "/" + args[1] + "/" + args[2] + "&key=" + token;
                return JSON.parse(await (await fetch(url)).text());
            case FIELDS.SEARCH_STOPS:
                url = API + FIELDS.SEARCH_STOPS + "/" + args[0] + "&key=" + token;
                return JSON.parse(await (await fetch(url)).text());
            case FIELDS.SEARCH:
                break;
            case FIELDS.ARRIVALS:
                break;
        }
    }
}