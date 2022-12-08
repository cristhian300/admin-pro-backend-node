/**
 Ruta : /api/usuarios'

 */
const { Router} = require('express');
const {getUsuarios ,creandoUsuarios } = require('../controllers/usuarios')
const { check} = require('express-validator');

const router = Router();

router.get('/', getUsuarios);

router.post('/',[
    check('nombre').not().isEmpty(),
    check('password').not().isEmpty(),
    check('email').isEmail(),
] ,creandoUsuarios );

module.exports= router;
