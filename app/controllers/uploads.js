const path = require('path')

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen')

const fs = require('fs')

const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios']

    if (!tiposValidos.includes(tipo)) {
        res.status(400).json(
            {
                ok: false,
                msg: 'No es un médico, usuario u hospital - tipo'
            }
        )
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }



    const file = req.files.imagen;
    console.log('imagenx', file);

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];


    const extensionesValidadas = ['png', 'jpg', 'jpeg', 'gif']

    if (!extensionesValidadas.includes(extensionArchivo)) {
        res.status(400).json(
            {
                ok: false,
                msg: 'No es una extensión permitida'
            }
        )
    }


    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`; //
    const path = `./uploads/${tipo}/${nombreArchivo}`;



    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err) {
            res.json({
                ok: false,
                msg: 'error al mover la imagen'
            })
        }            // return res.status(500).send(err);

        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        })
    });





}


const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    console.log('directorio',__dirname);
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`)
    console.log('pathImg',pathImg);
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    }
    else {
        const pathImg = path.join(__dirname, `../uploads/no_img.jpg`)
        res.sendFile(pathImg);
    }
}
module.exports = { fileUpload, retornaImagen }