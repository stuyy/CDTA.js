const URL = "http://api.cdta.org/api/v1/?request=ping&key=" + process.env.TOKEN;
const fetch = require('node-fetch');
const { BASE_URL, FIELDS } = require('./Constants');
const utils = require('./utils/Util');

module.exports = class RequestHandler {

    static async checkStatus(token)
    {
        const response = await fetch(utils.getEndpointURL(BASE_URL, 'ping', token));
        if(response.status == 200)
        {
            const json = JSON.parse(await response.text());
        }
        else if(response.status == 401)
            throw new Error("Invalid Credentials");
    }
    static async get(field, token, ...args)
    {
        var endpoint = utils.getEndpointURL(BASE_URL, field, token, ...args);
        const response = await fetch(endpoint);
        console.log(response);
        return await response.status == 200 ? JSON.parse(await response.text()) : Promise.reject(new Error(response.status));
        /*
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
                    return JSON.parse(await (await fetch(endpoint)).text())
                else if(args.length == 1)
                    return JSON.parse(await (await fetch(endpoint)).text())
            case FIELDS.DIRECTIONS:
                return JSON.parse(await (await fetch(endpoint)).text())
            case FIELDS.SCHEDULES:
                return JSON.parse(await (await fetch(endpoint)).text());
            case FIELDS.STOPS:
                return JSON.parse(await (await fetch(endpoint)).text());
            case FIELDS.NEAR_STOPS:
                return JSON.parse(await (await fetch(endpoint)).text());
            case FIELDS.SEARCH_STOPS:
                return JSON.parse(await (await fetch(endpoint)).text());
            case FIELDS.SEARCH:
                return (await fetch(endpoint)).status == 200 ? JSON.parse(await (await fetch(endpoint)).text()): Promise.reject(new Error("Invalid"))
                break;
            case FIELDS.ARRIVALS:
                break;
        } */
    }
    static async requestAPI(endpoint)
    {
        const response = await fetch(endpoint);
        console.log(response.status);
    }
}