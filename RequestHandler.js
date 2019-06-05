const URL = "http://api.cdta.org/api/v1/?request=ping&key=" + process.env.TOKEN;
const EventEmitter = require('events');
const fetch = require('node-fetch');

module.exports = class RequestHandler extends EventEmitter {

    checkStatus()
    {
        fetch(URL).then(res => res.text())
        .then(json => console.log(json))
        .catch(err => console.error);
    }
}