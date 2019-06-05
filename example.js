const { CDTA } = require('./index');
const app = new CDTA(process.env.TOKEN);

app.on('error', err =>{
    console.log(err);
});

app.get('time')
.then(res => console.log(res))
.catch(err => console.log(err));

app.get('routes')
.then(res => console.log(res))
.catch(err => console.log(err));