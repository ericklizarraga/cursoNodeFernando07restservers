const { Router } = require('express');
const { check } = require('express-validator');

const { existeCategoria, existeProducto } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const {
    productoGetALL,
    productoGetOne,
    productoPost,
    productoPut,
    productoDelete,
} = require('../controllers/productos');



const router = Router();

///////////////////////////////////post//////////////////////////////////

router.get('/', productoGetALL );

///////////////////////////////////post//////////////////////////////////

router.get('/:id', [
    check('id','el id no es valido :mongoid').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
],productoGetOne );

///////////////////////////////////post//////////////////////////////////

router.post('/',[
    validarJWT,
    esAdminRole,
    check('nombre','el nombre es obligatorio ').not().isEmpty(),
    check('precio','el precio es obligatorio ').not().isEmpty(),
    check('descripcion','la descripcion es obligatorio ').not().isEmpty(),
    check('disponible','el estado disponible es obligatorio ').not().isEmpty(),
    check('categoria','la categoria no es valida, min:24 ').isLength({ min:24 }),
    check('categoria','la categoria no es valida, not:mongoid').isMongoId(),
    validarCampos,
    check('categoria').custom( existeCategoria ),
    validarCampos,
], productoPost );

///////////////////////////////////post//////////////////////////////////

router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('id','el id no es valido :mongoid').isMongoId(),
    check('id').custom( existeProducto ),
    check('nombre','el nombre es obligatorio ').not().isEmpty(),
    check('precio','el precio es obligatorio ').not().isEmpty(),
    check('descripcion','la descripcion es obligatorio ').not().isEmpty(),
    check('disponible','el estado disponible es obligatorio ').not().isEmpty(),
    check('categoria','la categoria no es valida, min:24 ').isLength({ min:24 }),
    check('categoria','la categoria no es valida, not:mongoid').isMongoId(),
    validarCampos,
    check('categoria').custom( existeCategoria ),
    validarCampos,
], productoPut );

///////////////////////////////////post//////////////////////////////////

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','el id no es valido :mongoid').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], productoDelete );



module.exports = router;