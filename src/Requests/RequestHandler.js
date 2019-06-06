const URL = "http://api.cdta.org/api/v1/?request=ping&key=" + process.env.TOKEN;
const fetch = require('node-fetch');
const { BASE_URL, FIELDS } = require('../utils/Constants');
const utils = require('../utils/Util');

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
        const response = JSON.parse((await (await fetch(endpoint)).text()));
        if(FIELDS.hasOwnProperty(field.toUpperCase()))
            return await response.status == 200 ? response : Promise.reject(new Error(response.status + " : " + response.message));
        else
        {
            return Promise.reject(new Error("Invalid parameter/fields"))
        }
        // master branch 7e58e1c
    }
}
