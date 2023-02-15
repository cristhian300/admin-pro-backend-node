


const { response } = require("express")
const Usuario = require('../models/usuario')
const Medicos = require('../models/medico')
const Hospital = require('../models/hospital')

const getTodos = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    /* const usuarios = await Usuario.find({ nombre: regex });
     const medicos = await Medicos.find({ nombre: regex });
     const hospital = await Hospital.find({ nombre: regex });
 */

    const [usuarios,
        medicos,
        hospital] = await Promise.all([
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



const getDocumentosColleccion =async (req, resp = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;

    console.log('tabla',tabla);
   const regExp = new RegExp(busqueda,'i')

    switch (tabla) {
        case 'usuarios':
            const data = await Usuario.find({ nombre: regExp })

            resp.json({
                ok: true,
                resultado:data
            })
            break;

        default:
           
        resp.status(400).json({
            ok:false,
            msg:'La tabla tiene que ser usuarios/medicos/hospitales'
        })
    }

}

module.exports = { getTodos,getDocumentosColleccion }