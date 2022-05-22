const path = require('path');
const fs = require('fs');
const { request , response } = require("express");
// Require the Cloudinary library
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const { subirArchivo } = require("../helpers/subir-archivo");

const { Usuario, Producto } = require('../models');


const cargarArchivo = async (req = request, res = response )=> {


    try {
        const pathCompleto = await subirArchivo( req.files , undefined, 'imgs');

        res.json({
            nombre:pathCompleto
        });
    } catch (error) {
        res.status(400).json(error);
    }
}

//----------------------------------------------------------

const actualizarImagen = async( req = request, res = response )=>{
    
    const { coleccion, id} = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
                modelo = await Usuario.findById(id);
                if(!modelo){
                    return res.status(400).json({
                        msg:`no existe un usuario con el id ${id}`
                    });
                }
            break;
        case 'productos':
                modelo = await Producto.findById(id);
                if(!modelo){
                    return res.status(400).json({
                        msg:`no existe un producto con el id ${id}`
                    });
                }
            break;
        default:
            return res.status(500).json({msg:'se me olvido validar esto'});
    }


    //limpiar imagenes previas
    if( modelo.img ){
        const pathimagen = path.join(__dirname,'../uploads', coleccion, modelo.img );
        if( fs.existsSync( pathimagen ) ){
            fs.unlinkSync( pathimagen );
        }   
    }

    const nombre = await subirArchivo( req.files , undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();

    res.json({
        id,
        coleccion,
        msg:'put archivo ok',
        modelo
    });
}

//_-------------------------------------------------------------------------


const actualizarImagenCloudinary = async( req = request, res = response )=>{
    
    const { coleccion, id} = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
                modelo = await Usuario.findById(id);
                if(!modelo){
                    return res.status(400).json({
                        msg:`no existe un usuario con el id ${id}`
                    });
                }
            break;
        case 'productos':
                modelo = await Producto.findById(id);
                if(!modelo){
                    return res.status(400).json({
                        msg:`no existe un producto con el id ${id}`
                    });
                }
            break;
        default:
            return res.status(500).json({msg:'se me olvido validar esto'});
    }


    //limpiar imagenes previas
    if( modelo.img ){
       const nombreArr  = modelo.img.split('/');
       const nombre     = nombreArr[ nombreArr.length - 1 ]; 
       const [ public_id ] = nombre.split('.'); 
       cloudinary.uploader.destroy( public_id );
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    modelo.img = secure_url;
    await modelo.save();

    res.json({
        id,
        coleccion,
        msg:'put archivo ok',
        modelo
    });
}

//------------------------------------------------------------------------

const mostrarImagen = async( req = request, res = response )=>{
    const { coleccion, id} = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
                modelo = await Usuario.findById(id);
                if(!modelo){
                    return res.status(400).json({
                        msg:`no existe un usuario con el id ${id}`
                    });
                }
            break;
        case 'productos':
                modelo = await Producto.findById(id);
                if(!modelo){
                    return res.status(400).json({
                        msg:`no existe un producto con el id ${id}`
                    });
                }
            break;
        default:
            return res.status(500).json({msg:'se me olvido validar esto'});
    }


    //limpiar imagenes previas
    if( modelo.img ){
        const pathimagen = path.join(__dirname,'../uploads', coleccion, modelo.img );
        if( fs.existsSync( pathimagen ) ){
            return res.sendFile( pathimagen );
        }   
    }

    const pathImagenDefault = path.join( __dirname,'../assets/no-image.jpg' );
    res.sendFile( pathImagenDefault );
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary,
}