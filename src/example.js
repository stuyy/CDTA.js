const { CDTA } = require('./index');
const app = new CDTA(require('./config/config.json').token);
const Collection = require('./utils/Collection');

const express_app = require('express')();
const bodyParser = require('body-parser');

express_app.use(bodyParser.json());
express_app.get('/', async (req, res) => {
    try {
        var data = await app.get('routes');
        console.log(data);
        res.json(Array.from(data));
    }
    catch(ex)
    {
        console.log(ex);
    }
});

express_app.listen(3000, console.log("http://localhost:3000/"));


// app.get('time')
// .then(res => console.log(res))
// .catch(err => console.log(err));

// app.get('routes', 712)
// .then(res => console.log(res))
// .catch(err => console.log(err));

// app.get('directions', 12)
// .then(res => console.log(res))
// .catch(err => console.log(err));

// app.get('schedules', 12, 'weekday', 0)
// .then(res => console.log(res))
// .catch(err => console.log(err));

// app.get('stops', 12, 0)
// .then(res => console.log(res))
// .catch(err => console.log(err));

// app.get('searchstops', 'SUNY Collins Circle')
// .then(res => console.log(res))
// .catch(err => console.log(err));

// app.get('search', 'collins circle')
// .then(response => console.log(response))
// .catch(err => console.log(err));

// app.get('nearstops', 74.65, -73.75)
// .then(res => console.log(res))
// .catch(err => console.log(err));

// app.get('arrivals', 114, 2)
// .then(res => console.log(res))
// .catch(err => console.log(err));
