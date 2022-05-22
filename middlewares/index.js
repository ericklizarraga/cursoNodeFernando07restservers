
const  validaCampos  = require('./validar-campos');
const  validaJWT  = require('./validar-jwt');
const  validaRoles = require('./validar-roles');
const validarArchivoSubir = require('./validarArchivo');

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
    ...validarArchivoSubir,
}