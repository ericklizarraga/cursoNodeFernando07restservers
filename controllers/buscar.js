const { request, response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models');

const colleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles',
];

//////////////////////////////////usuarios/////////////////////////////////////////////


const buscarUsuario = async(    termino = '',   res=response    )=>{

    const esMongoId = ObjectId.isValid( termino );

    if( esMongoId ){
        const usuario = await Usuario.findById( termino ).and( [ { estado:true } ] );
        return res.status(200).json( {
            coleccion : 'usuarios',
            termino,
            result : (usuario) ? [usuario] : []
        } );
    }

    const regex = new RegExp( termino, 'i' );
    
    const usuarios = await Usuario.find({
        $or:    [ { nombre: regex }, { correo: regex } ],
        $and:   [ { estado : true } ]
     });

    return res.status(200).json( {
        coleccion : 'usuarios',
        termino,
        result : (usuarios) ? [usuarios] : []
    } );
    
}

////////////////////////////////categoira///////////////////////////////////////////////


const buscarCategoria = async(    termino = '',   res=response    )=>{

    const esMongoId = ObjectId.isValid( termino );

    if( esMongoId ){
        const categoria = await Categoria.findById( termino ).and( [ { estado:true } ] );
        return res.status(200).json( {
            coleccion : 'categorias',
            termino,
            result : (categoria) ? [categoria] : []
        } );
    }

    const regex = new RegExp( termino, 'i' );
    
    const categorias = await Categoria.find({
        nombre: regex ,
        $and:   [ { estado : true } ]
     });

    return res.status(200).json( {
        coleccion : 'categorias',
        termino,
        result : (categorias) ? [categorias] : []
    } );
    
}

////////////////////////////////categoira///////////////////////////////////////////////


const buscarProducto = async(    termino = '',   res=response    )=>{

    const esMongoId = ObjectId.isValid( termino );

    if( esMongoId ){
        const producto = await Producto.findById( termino ).and( [ { estado:true } ] )
                                       .populate('categoria','nombre');
        return res.status(200).json( {
            coleccion : 'productos',
            termino,
            result : (producto) ? [producto] : []
        } );
    }

    const regex = new RegExp( termino, 'i' );
    
    const productos = await Producto.find({
        nombre: regex ,
        $and:   [ { estado : true } ]
     }).populate('categoria','nombre');

    return res.status(200).json( {
        coleccion : 'productos',
        termino,
        result : (productos) ? [productos] : []
    } );
    
}

///////////////////////////////////////////////////////////////////////////////
const buscar = async( req = request, res = response)=> {

    const {coleccion, termino } = req.params;

    if(!colleccionesPermitidas.includes( coleccion )){
        return res.status(400).json({
            msg :   `las collecciones permitidas son: ${ colleccionesPermitidas }`
        });
    }

    switch( coleccion ){
        
        case 'usuarios':
           buscarUsuario( termino, res );
        break;
        
        case 'categorias':
            buscarCategoria( termino, res );
        break;

        case 'productos':
            buscarProducto( termino,res );
        break;
        
        default:
           return res.status(500).json({
                msg:'Se le olvido hacer esta bsuqueda'
            });
    }

} 


module.exports = buscar;
