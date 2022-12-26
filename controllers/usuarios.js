const Usuario = require('../models/usuario');
const {response } = require('express')



const getUsuarios =   async(req,res) =>{

    const usuarios = await Usuario.find({},'nombre email role google');

    //marca el tipo de error 
    //res.status(400).json({
    res.json({

        ok:true,
        usuarios
    })
}

const creandoUsuarios =  async (req,res= response) =>{

    console.log(req.body);

    try {

        const {email , nombre, password} = req.body;

       

      const exisEmail =  await Usuario.findOne( {email});

      if(exisEmail){
       res.status(400).json({
        ok:false,
        msg:'el correo ya existe'
       })
      }
        
     const usuario = new Usuario(req.body);
     await usuario.save();
     res.json({

        ok:true,
        usuario
    })  

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            mgs:'Error inesperado revisar log'
        });
    }

    //marca el tipo de error 
    //res.status(400).json({
    
}

module.exports = {
    getUsuarios, creandoUsuarios
}