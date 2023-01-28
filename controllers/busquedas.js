


const { response } = require("express")


const getTodos = async  (req, res = response) => {

    const busqueda = req.params.busqueda;

    res.json({

        ok: true,
        msg: 'todo ok',
        busqueda
    })

}



module.exports = {getTodos}