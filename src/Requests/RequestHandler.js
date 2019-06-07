const fetch = require('node-fetch');
const { BASE_URL, FIELDS } = require('../utils/Constants');
const utils = require('../utils/Util');
const CacheManager = require('../CacheStorage/CacheManager');
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
        [params] = [...args] // Reset params array to the args array
        try {
            if(field === FIELDS.ROUTES)
            {
                if(this.cacheManager === undefined || this.cacheManager === null)
                {
                    this.cacheManager = new CacheManager();
                    const raw = await fetch(endpoint);
                    const response = raw.status === 200 ? JSON.parse(await raw.text()) : null;
                    var routeMap = await utils.createObject(field, response);
                    this.cacheManager.routeCacheManager = routeMap;
                    return this.cacheManager.routeCacheManager;
                }
                else {
                    console.log("Cache Exists.");
                    // Check if user provided a parameter or wanted all routes.
                    if(params.length === 0)
                    {
                        console.log("No params");
                    }
                    else {
                        return this.cacheManager.routeCacheManager.get(params[0].toString());
                    }
                }
            }
        }
        catch(ex)
        {

        }
        /*
        try {
            const raw = await fetch(endpoint);
            const response = JSON.parse(await raw.text());
            console.log(response);
            var object = await utils.createObject(field, response, token);
            
            return await raw.status == 200 ? object : Promise.reject(new Error(raw.status + " : " + raw.message));
        }
        catch(ex)
        {
            console.log(ex);
        } */
        // master branch 7e58e1c
    }
}
