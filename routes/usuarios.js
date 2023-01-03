/**
 Ruta : /api/usuarios'

 */
const { Router } = require('express');
const { getUsuarios, creandoUsuarios, actualizarUsuarios, borrarUsuario } = require('../controllers/usuarios')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/', getUsuarios);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El  es obligatorio').isEmail(),
    validarCampos,
], creandoUsuarios);


router.put('/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El  es obligatorio').isEmail(),
        check('role', 'El  es rol  obligatorio').isEmail(),
        validarCampos,
    ]
    , actualizarUsuarios);

router.delete('/:id',
    borrarUsuario);


module.exports = router;
