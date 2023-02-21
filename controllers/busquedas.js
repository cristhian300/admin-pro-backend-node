


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





    //    const usuarios =await usuario.find({ nombre : regex})
    //     const medicos =await  medico.find({ nombre : regex})
    //     const hospitales =await  hospital.find({ nombre : regex})
    res.json({
        ok: true,
        usuarios,
        medicos,
        hospital
    });

}



const getDocumentosColleccion = async (req, resp = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;

    console.log('tabla', tabla);
    const regExp = new RegExp(busqueda, 'i')

    let data = [];
    switch (tabla) {
        case 'usuarios':
            data = await Usuario.find({ nombre: regExp })


            break;

        case 'medicos':
            data = await Medicos.find({ nombre: regExp })
                .populate('usuario','nombre img')
                .populate('hospital','nombre img')
            break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regExp })
            .populate('usuario','nombre img')
            break;
        default:

            resp.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            })


    }

    resp.json({
        ok: true,
        resultados: data
    })
}

module.exports = { getTodos, getDocumentosColleccion }