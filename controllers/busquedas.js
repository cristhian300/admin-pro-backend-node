


const { response } = require("express")
const  Usuario  = require('../models/usuario')
const  Medicos  = require('../models/medico')
const  Hospital  = require('../models/hospital')

const getTodos = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

   /* const usuarios = await Usuario.find({ nombre: regex });
    const medicos = await Medicos.find({ nombre: regex });
    const hospital = await Hospital.find({ nombre: regex });
*/
 
   const [  usuarios,
    medicos,
    hospital]  =  await Promise.all([
        await Usuario.find({ nombre: regex }),
       await Medicos.find({ nombre: regex }),
         await Hospital.find({ nombre: regex })
    ])


    res.json({
        ok: true,
        usuarios,
        medicos,
        hospital
    });

}



module.exports = { getTodos }