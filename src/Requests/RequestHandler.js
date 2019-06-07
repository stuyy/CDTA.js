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
                    if(params.length === 0) {
                        this.cacheManager.routeCacheManager.isAllCached = true;
                        Object.freeze(this.cacheManager); // Freeze Object to prevent future modification.
                        return [...this.cacheManager.routeCacheManager];
                    }
                    else {  
                        // User only requested one route on their first request. 
                        this.cacheManager.routeCacheManager.isAllCached = false;
                        return this.cacheManager.routeCacheManager; // Returns a map.
                    }
                }
                else {
                    console.log("Cache Exists. Trying to retrieve route: " + params[0]);
                    // Check if user provided a parameter or wanted all routes.
                    if(params.length === 0) // If no params, we need to cache all routes, and freeze the object.
                    {
                        if(!this.cacheManager.routeCacheManager.isAllCached)
                        {
                            console.log("All routes were NOT cached.");
                            const raw = await fetch(endpoint);
                            const response = raw.status === 200 ? JSON.parse(await raw.text()) : null;
                            var routeMap = await utils.createObject(field, response);
                            this.cacheManager.routeCacheManager = routeMap;
                            this.cacheManager.routeCacheManager.isAllCached = true;
                            Object.freeze(this.cacheManager.routeCacheManager); // Prevent routeCacheManager object from being modified.
                            console.log("Object Frozen");
                            // Now all routes are cached.
                        }
                        return [...this.cacheManager.routeCacheManager]; // Destruct the map into an array of [key, value] pairs.
                    }
                    else // Everything here might not be cached, and the user had already requested one route before but needs another one.
                    {
                        // At this point, the routeCacheManager has already been initialized, we just need to fetch the current data and cache it.
                        const raw = await fetch(endpoint);
                        const response = raw.status === 200 ? JSON.parse(await raw.text()) : null;
                        let route = await utils.createObject(field, response); // Create an object of Route type.
                        console.log(this.cacheManager.routeCacheManager);
                        return this.cacheManager.routeCacheManager.get(params[0].toString());
                    }
                }
            }
        }
        catch(ex)
        {
            console.log(ex);
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
