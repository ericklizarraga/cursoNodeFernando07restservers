const { response ,request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usauriosGet = async(req = request, res = response ) => {

     const { limite = 5, desde = 0 } = req.query;
    //  const usuarios = await Usuario.find( { estado: true })
    //                                 .skip( Number( desde ) )
    //                                 .limit( Number( limite ) );
    
    // const total = await Usuario.countDocuments({ estado :true }); 

    const [ total ,usuarios ] = await Promise.all([
        Usuario.countDocuments({ estado :true }),
        Usuario.find( { estado: true })
                .skip( Number( desde ) )
                .limit( Number( limite ) )
    ]);

    res.json({
        msg :'get controllers',
        total,
        usuarios,
    });
}




const usuariosPost = async (req = request, res = response ) => {
    

    const { nombre , correo, password, rol } =  req.body;
    const usuario = new Usuario( { nombre , correo, password, rol } );

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




const usuariosPut = async(req = request, res = response ) => {

    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;

   //verificar si existe el correo
   const existeEmail = await Usuario.findOne( { correo });
   if(existeEmail){
        const usuarioCorreocheck = await Usuario.findById( id )
            if( usuarioCorreocheck.correo != existeEmail.correo){
                return res.status(400).json({
                        msg:'el correo ya esta registrado'
                    });
           }
   }
 
    if(password){
        //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto , { new : true } );

    res.json({
        msg :'put',
        usuario,
    });
}



const usuariosDelete = async (req = request, res = response ) => {
    
    const { id } = req.params;
//eliminado fisicamente
   // const usuario = await Usuario.findByIdAndDelete( id );

   //eliminado logico
   const usuario = await Usuario.findByIdAndUpdate( id, { estado:false }, { new:true } );

    res.json({
        msg :'delete',
        id,
        usuario
    });
}




module.exports = {
    usauriosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
}