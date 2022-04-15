const { request , response } = require("express");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');


const login = async(req = request, res = response )=>{
    
    const { correo , password} = req.body;

    try {

        //verificar si el usario exciste
        const usuario = await Usuario.findOne({ correo });
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / Password no son correcto -correo'
            });
        }

        //si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario / Password no son correcto -estado:false'
            });
        }

        //verificaer la contraseña
        const validPassword = bcryptjs.compareSync( password , usuario.password );
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correcto -password'
            });
        }

        //generar jwt
        const token = await generarJWT( usuario.id );

        res.json({
            msg:'login ok',
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    login,
}