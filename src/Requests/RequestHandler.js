const URL = "http://api.cdta.org/api/v1/?request=ping&key=" + process.env.TOKEN;
const fetch = require('node-fetch');
const { BASE_URL, FIELDS } = require('../utils/Constants');
const utils = require('../utils/Util');

module.exports = class RequestHandler {

    static async checkStatus(token)
    {
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
        const raw = await fetch(endpoint);
        const response = JSON.parse((await (await fetch(endpoint)).text()));
        return await raw.status == 200 ? response : Promise.reject(new Error(raw.status + " : " + raw.message));
        // master branch 7e58e1c
    }
}
