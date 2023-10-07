// ruta
// /api/products

const { Router } = require("express")
const { getProducts, createProducts, updateProducts } = require("../controllers/products")
const { check } = require('express-validator')

const expressfileUpload = require('express-fileupload');
const { validarCampos } = require("../middlewares/validar-campos");

const router = new Router()
router.use(expressfileUpload());

router.get('/',

    getProducts
)

router.post('/',
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('price', 'El precio es obligatorio').not().isEmpty(),
    check('image')
        .custom((value, { req }) => {
            if (!req.files) throw new Error("La imagen es requerida");
            return true;
        }),
    validarCampos,
    createProducts
)


router.put('/:id', updateProducts)



module.exports = router