
const { request, response } = require('express')
const Product = require('../models/products')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const fileUpload = require('express-fileupload');

const getProducts = async (req, res = response) => {

    const desde = Number(req.query.desde) || 0

    const products = await Promise.all(
        await Product.find({}, 'name details price image enable')
            .skip(desde)
            .limit(10)
            .sort({ _id: -1 })
    )

    res.json({
        ok: true,
        products
    })
}

const createProducts = async (req, res = response) => {


    try {

        const product = new Product(req.body)
        const { name } = product
        const existName = await Product.findOne({ name })

        if (existName) {
            return res.status(400).json({
                ok: false,
                msg: "El nombre del producto ya existe"
            })
        }

        product.image = await validateAndSaveFiles(req.files);

        await product.save()



        return res.json({
            ok: true,
            product
        })



    } catch (error) {

        return res.status(500).json({
            ok: false,
            mgs: 'Error inesperado comuniquese con el administrador'
        })

    }


}


const updateProducts = async (req, res = response) => {

    try {
        const id = req.params.id
        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({
                ok: true,
                msg: 'Producto no encontrado por id',
            });
        }
        const { ...campos } = req.body;



        if (req.files) {
            const nameFile = await validateAndSaveFiles(req.files);
            campos.image = nameFile

            if (product.image) {
                const pathViejo = `./uploads/products/${product.image}`
                if (fs.existsSync(pathViejo)) {
                    //borrar la imagen anterior
                    fs.unlinkSync(pathViejo)
                }
            }
        }

        const productActualizado = await Product.findByIdAndUpdate(id, campos, { new: true });


        res.json({
            ok: true,
        })

    } catch (error) {

    }
}

const validateAndSaveFiles = async (files = fileUpload) => {
    if (!files || Object.keys(files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }
    // Procesar la imagen...
    const file = files.image;

    const nombreCortado = file.name.split('.'); // wolverine.1.3.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Path para guardar la imagen
    const path = `./uploads/products/${nombreArchivo}`;

    // Mover la imagen al archivo respectivo
    await file.mv(path, (err) => {
        // if (err) {
        //     console.log(err)
        //     return res.status(500).json({
        //         ok: false,
        //         msg: 'Error al mover la imagen'
        //     });
        // }

        // this.product.img = nombreArchivo;
        // this.product.save()
        // return res.json({
        //     ok: true,
        //     // product
        // })
    });
    return nombreArchivo

}

// updateImage = async (nameFile, id) => {

//     const product = Product.findById(id)

//     if (!product) {
//         return false
//     }
//     pathViejo = `./uploads/products/${product.image}`
//     if (fs.existsSync(path)) {

//         //borrar la imagen anterior
//         fs.unlinkSync(path)
//     }

//     product.image = nameFile
//     await Product.save();
//     return true;

// }



module.exports = { getProducts, createProducts, updateProducts }