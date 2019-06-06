const { CDTA } = require('./index');
const app = new CDTA(process.env.TOKEN);

app.on('error', err =>{
    console.log(err);
});

app.get('time')
.then(res => console.log(res))
.catch(err => console.log(err));

app.get('routes', 712)
.then(res => console.log(res))
.catch(err => console.log(err));

app.get('directions', 12)
.then(res => console.log(res))
.catch(err => console.log(err));

app.get('schedules', 12, 'weekday', 0)
.then(res => console.log(res))
.catch(err => console.log(err));

app.get('stops', 12, 0)
.then(res => console.log(res))
.catch(err => console.log(err));

app.get('searchstops', 'SUNY Collins')
.then(res => console.log(res))
.catch(err => console.log(err));

app.get('search', 'collins circle')
.then(response => console.log(response))
.catch(err => console.log(err));
