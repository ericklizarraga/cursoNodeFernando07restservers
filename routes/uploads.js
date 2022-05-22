
const { Router } = require('express');
const {check} = require('express-validator');

const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { collectionPermitida } = require('../helpers/db-validators');

const { validarCampos, validarArchivoSubir } = require('../middlewares');


const router = Router();



router.post('/',validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id','el id debe ser mongo id').isMongoId(),
    check('coleccion').custom( c => collectionPermitida( c, ['usuarios','productos'] ) ),
    validarCampos
], //actualizarImagen
    actualizarImagenCloudinary
 );


router.get('/:coleccion/:id',[
    check('id','el id debe ser mongo id').isMongoId(),
    check('coleccion').custom( c => collectionPermitida( c, ['usuarios','productos'] ) ),
    validarCampos
], mostrarImagen );

module.exports = router;