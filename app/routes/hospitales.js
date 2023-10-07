const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getHospitales, crearHospital, actualizartHospital, borrartHospital } = require('../controllers/hospitales')



const router = new Router();

router.get('/', getHospitales)

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    validarCampos
], crearHospital);


router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        validarCampos
    ]
    , actualizartHospital);

router.delete('/:id',
    validarJWT,
    borrartHospital);


module.exports = router;