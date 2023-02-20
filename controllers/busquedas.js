


const { response } = require("express");
const medico = require("../models/medico");
const usuario = require("../models/usuario");
const hospital = require("../models/usuario");

const getTodos = async (req, res = response) => {

    const busqueda = req.params.busqueda;


    const regex = new RegExp(busqueda, 'i');

    const [usuarios, medicos, hospitales] = await Promise.all([

        usuario.find({ nombre: regex }),
        medico.find({ nombre: regex }),
        hospital.find({ nombre: regex }),]
    )

    //    const usuarios =await usuario.find({ nombre : regex})
    //     const medicos =await  medico.find({ nombre : regex})
    //     const hospitales =await  hospital.find({ nombre : regex})
    res.json({

        ok: true,
        msg: 'todo ok',
        usuarios,
        medicos,
        hospitales
    })

}

const getDocumentosColeccion = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;


   switch (tabla) {
    case 'usuario':
        
        break;
   
    default:
        break;
   }


    const regex = new RegExp(busqueda, 'i');

    const [usuarios, medicos, hospitales] = await Promise.all([

        usuario.find({ nombre: regex }),
        medico.find({ nombre: regex }),
        hospital.find({ nombre: regex }),]
    )

     
    res.json({

        ok: true,
        msg: 'todo ok',
        usuarios,
        medicos,
        hospitales
    })

}

module.exports = { getTodos }