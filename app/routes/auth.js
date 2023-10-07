const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {renewToken} = require('../controllers/auth')

///api/login

const path ='/api/login'
const router = new Router();

router.post(`${path}/`, [
    check('email', 'El email  es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
    // validarJWT
], login)


router.post(`${path}/google`, [

    check('token', 'El token de google obligatorio').not().isEmpty(),
    validarCampos
], googleSignIn)

router.get(`${path}/renew` ,
    validarJWT,
    renewToken
)

module.exports = router;