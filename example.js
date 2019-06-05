const { CDTA } = require('./index');
const app = new CDTA(process.env.TOKEN);
app.on('error', err =>{
    console.log(err);
});