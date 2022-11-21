///console.log('hola amigos');

const express  = require('express');
const{  dbConnection} = require('./dataBase/config');
require('dotenv').config();
const cors = require('cors')



//crear Servidor de express
const app =express();

//configurar cors
app.use(cors())

dbConnection();

// console.log(process.env);

//acceso
//node_user
//8qQNLypZUmEw0rkV


app.get('/',(req,res) =>{
    //marca el tipo de error 
    //res.status(400).json({
    res.json({

        ok:true,
        mgf:'hola mundo'
    })
}
);

app.listen( process.env.PORT , ()=>{
    console.log('servidor corriendo en puerto ' + process.env.PORT);
})