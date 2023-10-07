const { Router } = require("express");
const { check} = require('express-validator');
const { getTodos, getDocumentosColleccion } = require("../controllers/busquedas");
const { validarJWT } = require("../middlewares/validar-jwt");
/* api/todo */



const router = Router()

router.get('/:busqueda',validarJWT,getTodos);

router.get('/coleccion/:tabla/:busqueda',validarJWT,getDocumentosColleccion);


module.exports = router;



