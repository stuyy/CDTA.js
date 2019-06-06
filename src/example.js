const { CDTA } = require('./index');
const app = new CDTA(process.env.TOKEN);
const Collection = require('./utils/Collection');

app.on('error', err =>{
    console.log(err);
});

app.on('authorized', () => {
    console.log("Authorized!");
});

const Arrival = require('./DataModels/Arrival');
let arrival = new Arrival(1, 'Washington', 'S', 123, 'Washington', 55, "23:00:45");

console.log(arrival);
arrival._minutes = '5555';

var collection = new Collection(null);
collection.set('anson', 'foong');
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

// app.get('arrivals', 12)
// .then(res => console.log(res))
// .catch(err => console.log(err));

