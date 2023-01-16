const { response } = require('express')
const usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req,res = response) =>{

    try {
   
       const {email , password} = req.body;
      
//verifica Email
       const usuarioDb = await usuario.findOne({email});
       
       if (!usuarioDb){
       return  res.status(400).json(
            {
                ok:false,
                msg:'email no valido'
            }
         )
       }

//verifica contraseña
      const validarPassword =  bcrypt.compareSync(password,usuarioDb.password)
      if (!validarPassword){
        return  res.status(400).json(
             {
                 ok:false,
                 msg:'constraseña no valido'
             }
          )
        }


//generar token

      const token = await  generarJWT(usuarioDb.id);

        res.json({
            ok:true,
             token
        })

    } catch (error) {
        res.status(500). json({
            ok:false,
            msg:'consultar con el admin' 
        })
    }
}

module.exports= {login};