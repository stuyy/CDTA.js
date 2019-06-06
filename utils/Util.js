
module.exports.getEndpointURL = function (BASE_URL, field, token, ...args)
{
    return BASE_URL + field + "/" + build([...args, token]);
}

function build(arguments)
{
    if(arguments.length == 0)
        return;
    else if(arguments.length == 1)
        return "&key=" + arguments[0];
    else
    {
        let el = arguments.shift();
        if(arguments.length == 1)
            return el + build(arguments);
        else
            return el + "/" + build(arguments);
    }
}
