const { response ,request } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const Usuario = require('../models/usuario');


const usauriosGet = (req = request, res = response ) => {

    const query = req.query;

    res.json({
        msg :'get controllers',
        query
    });
}


const usuariosPost = async (req = request, res = response ) => {
    
    const errors = validationResult( req );
    if(!errors.isEmpty()){
        return res.status(400).json( { errors } );
    }


    const { nombre , correo, password, rol } =  req.body;
    const usuario = new Usuario( { nombre , correo, password, rol } );

    //verificar si existe el correo
    const existeEmail = await Usuario.findOne( { correo });
    if( existeEmail ){
        return res.status(400).json({
            msg:'el correo ya esta registrado'
        });
    }

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //guardar en DB
    await usuario.save();

    res.json({
        msg :'post usuario',
        usuario
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