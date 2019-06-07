# CDTA.js

An Object Oriented, Promise-Based library that wraps around the CDTA Web API.

<p align="center">
  <img src="https://i.imgur.com/MCZF57W.png">
</p>

# Installation
` npm install cdta.js`

# Basic Usage
```JS
const { CDTA } = require('cdta');
const client = new CDTA('your api key');<div>

client.on('error', err => {
    console.log(err);
});

client.on('authorized', () => {
    console.log("Authorized!");
});
```
# With Promises

```JS
client.get('field name', [, parameters])
.then(result => console.log(result))
.catch(err => console.log(err));
```
**Example**
```JS
// 07216 is the bus_stop id for Collins Circle
// 3 is the amount of arrivals for each bus route that stops at Collins Circle
client.get('arrivals', '07216', 3) 
.then(result => console.log(result))
.catch(err => console.log(err));
```

# With Async/Await

```JS
(async function() {
    try {
        const result = await client.get('routes', 12); // Retrieves route information for bus route 12
        console.log(result);
        result = await client.get('directions', 12); // Retrieves the travelling direction of Route 12
        console.log(result);
    }
    catch(ex) {
        console.log(ex);
    }
})();

```

# Documentation

## Making HTTP GET Requests

All requests are made using the `get` function. A typical invocation of `get` would look like this:

```JS
var { CDTA } = require('cdta');
var client = new CDTA('token');

client.get('routes', 114)
```

<h2 id="get">get(field, [, parameters])</h2>

---

<h4>returns - </h4>

> a Promise which resolves a `Route` object containing static information about the given route. 

<h4>throws - </h4>

> Throws an error if the amount of arguments passed in exceeds 1.

Throws a `404`  error if the route/argument could not be found.

---

<h2 id="fields">Fields</h2>

a `FIELD` or `string` that determines which endpoint is requested. Some fields may require parameters, whereas others allow optional parameters. 

**All of these parameters must be passed in `get('field', [, parameters])` in-order or else you might receive incorrect information**

<h3>time</h3>

- `parameters`
    - **None**
- `returns` the current system date and time

<h3>routes</h3>

- `parameters`
    - **route_id** - the route identifier, e.g: 12, 114, 10, 11, etc. *This parameter is optional.*
- `returns` -  an Array of Route objects if no route is specified, or an individual Route otherwise.

<h3>directions</h3>

- `parameters`
    - **route_id** - the route identifier, e.g: 12, 114, 10, 11, etc.
- `returns` -  an Array of Direction objects

<h3>schedules</h3>

Retrieves all trip schedule information for the specified route and direction.

- `parameters`
    - **route_id** - the route identifier, e.g: 12, 114, 10, 11, etc.
    - **service_type** - Service type for route i.e: (Weekday, Saturday, Sunday)
    - **direction_id** - The direction the route is traveling in, usually 0 or 1.
- `returns` -  a Schedule Object

<h3>stops</h3>

Retrieves all stops for the route and direction it's traveling in.

- `parameters`
    - **route_id** - the route identifier, e.g: 12, 114, 10, 11, etc. This parameter is optional and will return all stops and either one or all directions.
    - **direction_id** - The direction the route is traveling in, usually 0 or 1. This parameter is optional, and will return all directions if none is specified.
- `returns` -  a Stop Object

<h3>nearstops</h3>

Retrieves all stops that are within the range of the coordinates specified. 

- `parameters`
    - **latitude** - the latitude of the search
    - **longitude** - the longitude of the search
    - **number_of_stops** - a number of stops to return, this is an optional parameter, if none is specified it will return 10 by default.
- `returns` -  a NearStop Object

<h3>searchstop</h3>

Retrieves all stops that are within the range of the coordinates specified. 

- `parameters`
    - **search_term** - a string or numeric value to search for.
- `returns` -  a SearchStop Object

<h3>search</h3>

Retrieves either routes, stops, and/or landmarks.

- `parameters`
    - **search_term** - a string or numeric value to search 
    - **result_count** - total results to return. This is an optional parameter, returns all if  none is specified.
- `returns` -  a Search Object

<h3>arrivals</h3>

Retrieves all arrivals that are scheduled at the specified Bus Stop

- `parameters`
    - **bus_stop_id** - the id of the bus stop, e.g: 07216 (Collins Circle)
    - **number_of_arrivals** - the number of estimated (E) and scheduled (S) arrivals for *each* route. This parameter is optional and returns 5 results if none is specified.
- `returns` -  a BusStop Object

<h3>alerts</h3>

Retrieves all active service alerts

- `parameters`
    - None
- `returns` -  an Alert Object