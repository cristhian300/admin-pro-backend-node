const Usuario = require('../models/usuario');
const { response } = require('express')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0

    // const usuarios = await Usuario.find({}, 'nombre email role google')
    // .skip(desde)
    // .limit(10);

    // const total = await Usuario.count();

    const [usuarios, total ] = await Promise.all([
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

module.exports = {
    getUsuarios, creandoUsuarios, actualizarUsuarios, borrarUsuario
}