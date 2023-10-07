const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('..//middlewares/validar-jwt');
const {   getMedicos,  crearMedicos,  actualizartMedicos,  borrartMedicos } = require('../controllers/medicos')



const router = new Router();

router.get('/', getMedicos)

router.post('/', [
    validarJWT,
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('hospital','El id debe ser valido').isMongoId(),
    validarCampos
], crearMedicos);


router.put('/:id',
    [

    ]
    , actualizartMedicos);

router.delete('/:id',
borrartMedicos);


module.exports = router;