const { response } = require('express')
const Medico = require('../models/medico')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const getMedicos = async (req, res) => {


    try {

        const medicosDb = await Medico.find()
            .populate('usuario', 'nombre')
            .populate('hospital', 'nombre')

        res.json({

            ok: true,
            medicos: medicosDb

        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mgs: 'Error inesperado revisar log'
        });
    }

}

const crearMedicos = async (req, res = response) => {

    try {

        const uid = req.uid;

        //  const hospital = req.body.hospital;

        //    const medicoDB=  Medico.findOne({hospital }); 

        // console.log(medicoDB);

        const medicos = new Medico(
            {
                ...req.body,
                usuario: uid,
            }

        );


        const medicoDb = await medicos.save();


        res.json({

            ok: true,
            medicos: medicoDb
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mgs: 'Error inesperado revisar log'
        });
    }


}



const actualizartMedicos = async (req, res) => {


    res.json({

        ok: true,
        msg: 'actualizartMedicos',

    })
}


const borrartMedicos = async (req, res) => {


    res.json({

        ok: true,
        msg: 'borrartMedicos',

    })
}

module.exports = {
    getMedicos, crearMedicos, actualizartMedicos, borrartMedicos
}