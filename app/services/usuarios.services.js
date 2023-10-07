const axios = require("axios");

const respError = (err) => {
    return {
        error: true,
        status: err.status || err.response?.status || 400,
        msg:
            err.response?.statusText ||
            err.message ||
            err.request ||
            err.detail ||
            err.msg,
    };
};


const getUsuarios = async ( token) => {

    try {
        
        const config = {
            headers : {'x-token':token}
        }
         
        const respuesta = await axios.get('http://localhost:3001/api/usuarios',config )
        console.log('respuesta getUsuarios', respuesta);
        return respuesta.data
    } catch (error) {
        console.log('error getUsuarios', error);
        return respError(error)
    }


}

module.exports= {  getUsuarios}