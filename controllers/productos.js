const  { response, request } = require('express'); 
const { Producto, Categoria } = require('../models');


const productoGetALL = async( req = request, res = response )=> {

    const { limite = 5, desde = 0 } = req.query;

    const consulta = [
        await Producto.countDocuments( {estado :true} ),
        await Producto.find( {estado:true} )
                        .populate('usuario',['nombre','rol'])
                        .populate('categoria','nombre')
                        .skip( Number(desde) )
                        .limit( Number(limite) )
    ];
 
    const [total,productos] = await Promise.all( consulta );
 
    res.status(200).json({
        msg:'get all',
        total,
        limite,
        desde,
        productos
    });
}

///////////////////////////////////post//////////////////////////////////

const productoGetOne = async( req = request, res = response )=> {

    const {id} = req.params;

    const producto = await Producto.findById( id )
                            .populate('usuario','nombre')
                            .populate('categoria','nombre');

    res.status(200).json({
        msg:'get one',
        id,
        producto
    });
}

///////////////////////////////////post//////////////////////////////////

const productoPost = async( req = request, res = response )=> {

    const { estado, ...data } = req.body;
    data.usuario = req.usuario._id;
    data.nombre = req.body.nombre.toUpperCase();

    const existeProducto = await Producto.findOne({ nombre:data.nombre });
    if(existeProducto){
        return res.status(400).json({
            msg:`el producto ${existeProducto.nombre} ya existe`
        });
    }

    const producto = new Producto( data );
    await producto.save();

   res.status(201).json({
       msg:'post productos',
       data,
       producto,
       existeProducto
   });
}

///////////////////////////////////post//////////////////////////////////

const productoPut = async( req = request, res = response )=> {

        const {id} = req.params;
        const {estado, usuario, ...data } = req.body;

        if(data.nombre){
            data.nombre = data.nombre.toUpperCase();
        }

        data.usuario = req.usuario._id;
        const producto = await Producto.findByIdAndUpdate(id, data, { new:true});

        res.status(200).json(producto);

}

///////////////////////////////////post//////////////////////////////////

const productoDelete = async( req = request, res = response )=> {
    const {id} = req.params;

    const producto = await Producto.findByIdAndUpdate(id , { estado:false },{ new:true });

    res.json({
        msg:'delete producto',
        id,
        producto
    });
}


module.exports = {
    productoGetALL,
    productoGetOne,
    productoPost,
    productoPut,
    productoDelete,
}