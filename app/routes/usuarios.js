/**
 Ruta : /api/usuarios'

 */
const { Router } = require('express');
const { getUsuarios, creandoUsuarios, actualizarUsuarios, borrarUsuario, usuarioByApi } = require('../controllers/usuarios')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();
router.get('/byapi', usuarioByApi);

router.get('/',
    validarJWT,
    getUsuarios);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El  es obligatorio').isEmail(),
    validarCampos,
], creandoUsuarios);


router.put('/:id',
    [validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El  es obligatorio').isEmail(),
        check('role', 'El  es rol  obligatorio').not().isEmpty(),
        validarCampos,
    ]
    , actualizarUsuarios);

router.delete('/:id', validarJWT,
    borrarUsuario);


module.exports = router;
