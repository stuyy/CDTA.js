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
        console.log(endpoint);
        try {
            if(field === FIELDS.ROUTES)
            {
                if(args.length === 0) // Trying to fetch all routes.
                {
                    const raw = await fetch(endpoint);
                    //const response = raw.status === 200 ? JSON.parse()
                    if(this.cacheManager === undefined || this.cacheManager === null)
                    {
                        this.cacheManager = new CacheManager();
                    }
                }
                else {
                    // Check the chache to see if the route id exists. If it does, retrieve and return.
                }
            }
        }
        catch(ex)
        {

        }
        try {
            const raw = await fetch(endpoint);
            const response = JSON.parse((await (await fetch(endpoint)).text()));
            console.log(response);
            var object = await utils.createObject(field, response, token);
            
            return await raw.status == 200 ? object : Promise.reject(new Error(raw.status + " : " + raw.message));
        }
        catch(ex)
        {
            console.log(ex);
        }
        // master branch 7e58e1c
    }
}
