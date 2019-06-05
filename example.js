const { CDTA } = require('./index');
const app = new CDTA(process.env.TOKEN);

app.on('error', err =>{
    console.log(err);
});

app.get('time')
.then(res => console.log(res))
.catch(err => console.log(err));

app.get('routes', 12, 1)
.then(res => console.log('done'))
.catch(err => console.log(err));