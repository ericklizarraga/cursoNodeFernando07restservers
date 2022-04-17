
const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async( req = request , res = response, next )=>{

    const token = req.header('x-token');
    console.log(token);

    if( !token ){
        return res.status(401).json({
            msg:'no hay token en la peticion'
        });
    }


    try {
        
        const { uid } = jwt.verify( token , process.env.SECRETORPRIVATEKEY );
        //console.log( uid );
        //?leer el  usaurio que coresponde al uid
        const usuario = await Usuario.findById( uid );
        if( !usuario ){
            return res.status(401).json({
                msg:'inicie sesion para continuar'
            });
        }

        if( !usuario.estado ){
            return res.status(400 ).json({
                msg:'el usuario ya no existe'
            });
        }

        req.usuario = usuario;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valiido'
        });
    }

}

module.exports = {
    validarJWT,
}