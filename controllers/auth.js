const { response } = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');




const login = async (req, res = response) => {

    try {
        const { email, password } = req.body;
        //verifica Email
        const usuarioDb = await Usuario.findOne({ email });

        if (!usuarioDb) {
            return res.status(400).json(
                {
                    ok: false,
                    msg: 'email no valido'
                }
            )
        }
        //verifica contraseña
        const validarPassword = bcrypt.compareSync(password, usuarioDb.password)
        if (!validarPassword) {
            return res.status(400).json(
                {
                    ok: false,
                    msg: 'constraseña no valido'
                }
            )
        }
        //generar token
        const token = await generarJWT(usuarioDb.id);
        res.json({
            ok: true,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'consultar con el admin'
        })
    }
}


const googleSignIn = async (req, res = response) => {

    try {
        const googleUser = await googleVerify(req.body.token);

        const { email, name, picture } = googleUser

        const usuarioDB = await Usuario.findOne({ email })

        let usuario;

        if (!usuarioDB) {
            usuario = new Usuario(
                {
                    nombre: name,
                    email,
                    password: '@@@',
                    img: picture,
                    google: true
                }
            )
        }
        else {
            usuario = usuarioDB
            usuario.google = true;
        };


        await usuario.save()

        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            email, name, picture, token
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de google no es correcto'
        })
    }


}


const renewToken = async (req, res = response) => {

    console.log(req.uid);

    const uid = req.uid;
    const token = await generarJWT(uid);


    usuarioDb = await Usuario.findById(uid, 'nombre email')

 
    res.json({
        ok: true,
        token,
        usuario: usuarioDb
    })

}

module.exports = { login, googleSignIn, renewToken };