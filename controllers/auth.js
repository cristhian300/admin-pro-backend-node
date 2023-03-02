const { response } = require('express')
const usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const {googleVerify} = require('../helpers/google-verify')

const login = async (req, res = response) => {

    try {

        const { email, password } = req.body;

        //verifica Email
        const usuarioDb = await usuario.findOne({ email });

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

     const {email,name,picture} = googleUser

        res.json({
            ok: true,
            email,name,picture
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de google no es correcto'
        })
    }


}

module.exports = { login, googleSignIn };