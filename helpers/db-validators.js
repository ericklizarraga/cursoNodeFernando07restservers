const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async( rol = '' )=>{
    
    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
         throw new Error(`el rol ${ rol } no esta registrado en la DB`);
    }
}

const emailExiste = async( correo = '' ) => {
    const existeEmail = await Usuario.findOne( { correo });
    if( existeEmail ){
       throw new Error('el correo ya esta registrado');
    }
}

const existeUsuarioPorId = async( id = '' ) => {
    const existeUsuario =  await Usuario.findById( id )
    if( !existeUsuario ){
       throw new Error(`EL id no existe ${id}`);
    }
}


// const esmiCorreo = async(  id = '', correo = '' )=> {
//     const existeEmail = await Usuario.findOne( { correo });
//     if(existeEmail){
//          const usuarioCorreocheck = await Usuario.findById( id )
//              if( usuarioCorreocheck.correo != existeEmail.correo){
//                 throw new Error(`EL correo ya existe el usuario`);
//             }
//     }
// }


const existeCategoria = async( id = '')=> {
    const categoria = await Categoria.findById( id );
    if(!categoria){
        throw new Error('la categoria no existe');
    }
}


const existeProducto = async( id = '')=>{
    const producto = await Producto.findById( id );
    if(!producto){
        throw new Error('el producto no exite');
    }
}




module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    // esmiCorreo,
    existeCategoria,
    existeProducto,
}