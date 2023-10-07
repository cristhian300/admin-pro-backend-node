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
        data:err.response.data     
    };
};


const getTokenApi = async (email, password) => {

    try {
        
        var data = {
            email: email,
            password: password
        };
         
        const respuesta = await axios.post('http://localhost:3001/api/loginn',data)
        console.log('respuesta getTokenApi', respuesta);
        return respuesta.data
    } catch (error) {
        console.log('error getTokenApi', error);
        return respError(error)
    }


}

module.exports= {getTokenApi}