const { response, request } = require("express");
const { 
    Categoria,
    } = require('../models');

    
///////////////////////////////////post//////////////////////////////////

const categoriasGetAll = async( req=request , res = response)=>{


    const { limite = 5, desde = 0 } = req.query;
    
    const consulta = [
        await Categoria.countDocuments( {estado:true}),
        await Categoria.find({ estado:true})
                        .populate('usuario',['nombre','rol'] )
                        .skip( Number(desde) )
                        .limit( Number(limite) )
    ];

    const [ total, categorias ] = await Promise.all( consulta );

    res.json({
        msg:'get all categorias',
        total,
        desde,
        limite,
        categorias
    });
}


///////////////////////////////////post//////////////////////////////////

const categoriasGetOne = async( req=request , res = response)=>{

    const { id } = req.params;

    const categoria = await Categoria.findById( id ).populate('usuario','nombre');

    res.json({
        msg:'get one categorias',
        id,
        categoria
    });
}

///////////////////////////////////post//////////////////////////////////

const categoriasPost = async( req=request , res = response)=>{

    const nombre = req.body.nombre.toUpperCase();

    const  categoriaDb = await Categoria.findOne({nombre});
    if(categoriaDb){
        return res.status(400).json({
            msg:  `la categoria ${ categoriaDb.nombre } ya existe`,
        });
    }

    const data = {
        nombre,
        usuario : req.usuario._id
    }

    const categoria = new Categoria( data );
    await categoria.save();

    res.status(201).json({
        msg:'post categorias creada',
        categoria
    });
}


///////////////////////////////////post//////////////////////////////////

const categoriasPut = async( req=request , res = response)=>{
    
    const { id } = req.params;
    const { estado, usuario,...data } = req.body;

    data.nombre = req.body.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id , data ,{ new:true });
    res.json({
        msg:'put categorias',
        id,
        categoria
    });
}


///////////////////////////////////post//////////////////////////////////

const categoriasDelete = async( req=request , res = response)=>{

    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id , { estado:false },{ new:true });

    res.json({
        msg:'delete categorias',
        id,
        categoria
    });
}

module.exports = {
    categoriasGetAll,
    categoriasGetOne,
    categoriasPost,
    categoriasPut,
    categoriasDelete,
}