const { CDTA } = require('./index');
const app = new CDTA(require('./config/config.json').token);
const Collection = require('./utils/Collection');
app.on('error', err =>{
    console.log(err);
});

app.on('authorized', () => {
    console.log("Authorized!");
});

// app.get('time')
// .then(res => console.log(res))
// .catch(err => console.log(err));

app.get('routes')
.then(res => console.log(res))
.catch(err => console.log(err));

// app.get('directions', 12)
// .then(res => console.log(res))
// .catch(err => console.log(err));

// app.get('schedules', 712, 'weekday', 0)
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

// app.get('nearstops', 42.6635, -73.78373)
// .then(res => console.log(res))
// .catch(err => console.log(err));

// app.get('arrivals', 114, 2)
// .then(res => console.log(res))
// .catch(err => console.log(err));

