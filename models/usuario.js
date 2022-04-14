
const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({

    nombre :{
        type :String,
        required: [true,'El nombre es obligatorio']
    },
    correo :{
        type :String,
        required: [true,'El correo es obligatorio'],
        uniqued: true
    },
    password :{
        type :String,
        required: [true,'El password es obligatorio']
    },
    img :{
        type :String,
    },
    rol :{
        type :String,
        required: [true, 'rol requerido'],
        enum: ['ADMIN_ROLE', 'USER_ROLE','VENTAS_ROLE']
    },
    estado:{
        type:Boolean,
        default: true
    },
    google:{
        type:Boolean,
        default: false
    },

});

usuarioSchema.methods.toJSON = function(){
    const { __v, password , ...usuario } = this.toObject();
    return usuario;
}

module.exports = model( 'Usuario', usuarioSchema );