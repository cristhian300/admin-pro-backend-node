const Usuario = require('../models/usuario');
const { response } = require('express')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Hospital = require('../models/hospital');
const usuario = require('../models/usuario');


const getHospitales = async (req, res) => {


   const hospitalDB = await Hospital.find().populate('usuario','nombre')

   //console.log('Data hospital',hospitalDB);

    res.json({

        ok: true,
        hospital: hospitalDB,

    })
}

const crearHospital = async (req, res = response) => {

    try {
        const uid = req.uid
        const hospital = new Hospital({
            usuario: uid,
            ...req.body
        }
        )


        console.log("Crear Hospital - id usuario", uid);
      const hospitalDb =   await hospital.save();

        res.json({

            ok: true,
            hospitalDb
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mgs: 'Error inesperado revisar log'
        });
    }


}



const actualizartHospital = async (req, res) => {


    res.json({

        ok: true,
        msg: 'actualizartHospital',

    })
}


const borrartHospital = async (req, res) => {


    res.json({

        ok: true,
        msg: 'borrartHospital',

    })
}

module.exports = {
    getHospitales, crearHospital, actualizartHospital, borrartHospital
}