const fetch = require('node-fetch');
const { BASE_URL, FIELDS } = require('../utils/Constants');
const utils = require('../utils/Util');
const Cache = require('../CacheStorage/Cache');
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
            const obj = utils.createObject(field, response, token);
            return await raw.status == 200 ? obj : Promise.reject(new Error(raw.status + " : " + raw.message));
        }
        catch(ex)
        {
            console.log(ex);
        }
        // master branch 7e58e1c
    }
    static getRoutes()
    {
        console.log(this.token);
    }
    
} 
