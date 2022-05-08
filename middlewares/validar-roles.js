const { response, request } = require('express');
const role = require('../models/role');
const Usuario = require('../models/usuario');

const esAdminRole = async( req = request ,res = response, next )=>{

    if(!req.usuario){
        return res.status(500).json({
            msg:'se quiere verificar el role sin validar el token primero'
        });
    }

    const { rol , nombre } = req.usuario; 
    if(rol != 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `usuario ${nombre} no tiene permiso para continuar...`
        });
    }

    next();
}   

const tieneRole = ( ...roles  )=>{

    return ( req = request ,res = response, next )=> {

        if(!req.usuario){
            return res.status(500).json({
                msg:'se quiere verificar el role sin validar el token primero'
            });
        }

        if( !roles.includes( req.usuario.rol ) ){
            return res.status(401).json({
                msg:`el servicio requiere uno  de estos roles ${ roles }`
            });
        }
        
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole,
};