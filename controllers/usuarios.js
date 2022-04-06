const { response ,request } = require('express');



const usauriosGet = (req = request, res = response ) => {

    const query = req.query;

    res.json({
        msg :'get controllers',
        query
    });
}


const usuariosPost =  (req = request, res = response ) => {
    
    const {nombre ,edad} =  req.body;

    res.json({
        msg :'post',
        nombre,
        edad
    });
}


const usuariosPut = (req = request, res = response ) => {

    const id = req.params.id;

    res.json({
        msg :'put',
        id
    });
}

const usuariosDelete =  (req, res = response ) => {
    res.json({
        msg :'delete'
    });
}




module.exports = {
    usauriosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
}