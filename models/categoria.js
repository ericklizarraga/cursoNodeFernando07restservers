
const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre:{
        type: String,
        required: [true,'el rol es obligatorio'],
        unique:true,
    },
    estado:{
        type: Boolean,
        default :true,
        required: [true,'el estado es obligatorio']
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true,'el usuario id es obligatorio']
    }
});


CategoriaSchema.methods.toJSON = function(){
    const { __v, estado, ...data } = this.toObject();
    return data;
}


module.exports = model( 'Categoria',CategoriaSchema );