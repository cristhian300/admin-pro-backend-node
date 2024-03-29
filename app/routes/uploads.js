const { Router } = require("express");
const { check} = require('express-validator');
const { fileUpload, retornaImagen } = require("../controllers/uploads");
 
const { validarJWT } = require("../middlewares/validar-jwt");
/* api/todo */

const expressfileUpload = require('express-fileupload');

//igual que express()
const router = Router()
router.use(expressfileUpload());
router.put('/:tipo/:id',validarJWT,fileUpload);
 router.get('/:tipo/:foto',retornaImagen);

 
module.exports = router;



