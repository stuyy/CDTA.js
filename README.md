# CDTA.js

An Object Oriented, Promise-Based library that wraps around the CDTA Web API.

<p align="center">
  <img src="https://i.imgur.com/MCZF57W.png">
</p>

# Installation
` npm install cdta.js`

# Basic Usage
```JS
const { CDTA } = require('cdta.js');
const client = new CDTA('your api key');

client.on('error', err => {
    console.log(err);
});

client.on('authorized', {
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

# Documentation
