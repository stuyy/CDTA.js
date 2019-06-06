const fetch = require('node-fetch');
const { BASE_URL, FIELDS } = require('../utils/Constants');
const Cache = require('../CacheStorage/Cache');
const RouteCache = require('../CacheStorage/RouteCache');
const utils = require('../utils/Util');
/**
 * RequestHandler takes care of ALL API Requests.
 * RequestHandler also has a Cache object, which will be responsible for taking care of all cached data
 */

module.exports = class RequestHandler {

    static async checkStatus(token)
    {
        this.token = token;
        const response = await fetch(utils.getEndpointURL(BASE_URL, 'ping', token));
        // Check status and ensure headers are correct.
        if(response.status == 200) // The "ping" field always returns text/html... don't parse.
            return response.status;
        else if(response.status == 401)
            throw new Error("Invalid Credentials");
    }
    static async get(field, token, ...args)
    {
        var [params] = [...args]
        params = params.concat(token);
        var endpoint = utils.getEndpointURL(BASE_URL, field, params);
        try {
            const raw = await fetch(endpoint);
            const response = JSON.parse((await (await fetch(endpoint)).text()));
            const obj = await utils.createObject(field, response, token);
            return await raw.status == 200 ? obj : Promise.reject(new Error(raw.status + " : " + raw.message));
        }
        catch(ex)
        {
            console.log(ex);
        }
        // master branch 7e58e1c
    }
    /*
    static async getRoutes(route)
    {
        console.log(route);
        const res = await fetch(BASE_URL + FIELDS.ROUTES + "/" + route + "&key=" + this.token);
        const text = await res.text();
        return res.status == 200 ? JSON.parse(text) : Promise.reject("Error.")
    }
    static async cacheRoutes(routeId, route)
    {
        if(this.routeCacher === undefined || this.routeCacher === null)
        {
            this.routeCacher = new RouteCache();
        }
        else
        {
            console.log(this.routeCacher);
        }
    }
    */
}
