///console.log('hola amigos');

const express  = require('express');
const{  dbConnection} = require('./dataBase/config');
require('dotenv').config();
const cors = require('cors')



//base -- crear Servidor de express
const app =express();

//configurar cors acceso a cualquier dominio
app.use(cors())

//lectura y parseo body ** leer entrada request del servicio
app.use(express.json());
dbConnection();

// console.log(process.env);



app.use('/api/usuarios', require('./routes/usuarios'))
// app.get('/api/usuarios',(req,res) =>{
//     //marca el tipo de error 
//     //res.status(400).json({
//     res.json({

//         ok:true,
//         usuarios:[{
//             id:123,
//             nombre:'Fernando'
//         }]
//     })
// });
app.use('/api/login', require('./routes/auth'))

app.listen( process.env.PORT , ()=>{
    console.log('servidor corriendo en puerto ' + process.env.PORT);
})