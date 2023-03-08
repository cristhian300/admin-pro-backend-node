const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {renewToken} = require('../controllers/auth')

///api/login

const router = new Router();

router.post('/', [
    check('email', 'El email  es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login)


router.post('/google', [

    check('token', 'El token de google obligatorio').not().isEmpty(),
    validarCampos
], googleSignIn)

router.get('/renew',
    validarJWT,
    renewToken
)

module.exports = router;