const Usuario = require('../models/usuario');
const { response } = require('express')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const axios = require('axios');

const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0

    // const usuarios = await Usuario.find({}, 'nombre email role google')
    // .skip(desde)
    // .limit(10);

    // const total = await Usuario.count();

    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'nombre email role google img')
            .skip(desde)
            .limit(10),
        Usuario.countDocuments()

    ])


    res.json({

        ok: true,
        usuarios,
        total

    })
}

const creandoUsuarios = async (req, res = response) => {

    console.log(req.body);

    try {

        const { email, nombre, password } = req.body;



        const exisEmail = await Usuario.findOne({ email });

        if (exisEmail) {
            res.status(400).json({
                ok: false,
                msg: 'el correo ya existe'
            })
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        /////////////////////////////



        await usuario.save();

        const token = await generarJWT(usuario.id)

        res.json({

            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mgs: 'Error inesperado revisar log'
        });
    }

    //marca el tipo de error 
    //res.status(400).json({

}

const actualizarUsuarios = async (req, res = response) => {

    try {
        console.log(req.body);

        const uid = req.params.id;

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {

            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario por ese id'

            })
        }

        //actualizaciones 
        //  const campos = req.body;
        const { password, google, email, ...campos } = req.body;
        if (usuarioDB.email != email) {
            const exisEmail = await Usuario.findOne({ email })
            if (exisEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese mail'
                })
            }
        }
        // delete campos.password;
        // delete campos.google;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json(
            {
                ok: true,
                usuario: usuarioActualizado
            }
        )

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }

}



const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {

            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario por ese id'

            })
        };


        await Usuario.findByIdAndDelete(uid);

        return res.json({
            ok: true,
            msg: 'Usuario Eliminado'
        })
    } catch (error) {

        return res.status(400).json({
            ok: false,
            msg: 'comuniquese con el administrador'
        });

    }


}


const usuarioByApi = async (req, res = response) => {



    getTokenApi('cristhian8731', '123456').then(
        x => console.log('resultado', x) 
     )



    // let url = `http://localhost:${process.env.PORT}/api/usuarios`;

    // var config = {
    //     method: 'get',
    //     url: url,
    //     headers: {
    //         'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2E5ZjlmNWI0OTQ5NTZjZDc5NDAxMWUiLCJpYXQiOjE2NzgzMTI3NTYsImV4cCI6MTY3ODM1NTk1Nn0.kdDEQskBxs7dQCm97EcOPGRsq5jTliK0EKMvMT2IuYs'
    //     },

    //     data: null
    // };

    //   axios(config)
    //     .then(function (response) {
    //         //  console.log(JSON.stringify(response.data));
    //         const { nombre, email } = response.data.usuarios[0]

    //         const dataRecover = { nombre, email }
    //         console.log('recuperado', dataRecover);
    //         res.send({ recuperado: dataRecover })
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

}


const getTokenApi = (email, password) => {
    var data = JSON.stringify({
        "email": "cristhian8731@gmail.com",
        "password": "123456"
    });

    var config = {
        method: 'post',
        url: 'http://localhost:3001/api/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            console.log('api inicial token', JSON.stringify(response.data));

            return response.data

        })
        .catch(function (error) {
            console.log(error);

        });

}


module.exports = {
    getUsuarios, creandoUsuarios, actualizarUsuarios, borrarUsuario, usuarioByApi
}