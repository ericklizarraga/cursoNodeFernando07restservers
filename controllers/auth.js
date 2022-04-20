const { request , response } = require("express");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');
const { googleVerify } = require("../helpers/goolge-verify");
const { json } = require("express/lib/response");


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



const googleSignIn = async( req = request, res= response )=> {

    const { id_token } = req.body;

    try {
        
        const { nombre ,img ,correo } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });
        if(!usuario){
            const  data = {
                nombre,
                correo,
                password:':P',
                img,
                google:true,
                rol: 'USER_ROLE',
            }

            usuario = new Usuario( data );
            usuario.save();
        }

        if(!usuario.estado ){
            return res.status(401).json({
                msg:'Hable con el administrador el usuario esta bloqueado'
            });
        }

        //generrar jwt
        const  token = await generarJWT( usuario.id );

        res.json({
            msg:'todo ok',
            usuario,
            token
        });

    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'el token no se pudo verificar',
            id_token
        });
    }
} 


module.exports = {
    login,
    googleSignIn,
}