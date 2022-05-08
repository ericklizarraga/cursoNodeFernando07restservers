

const { Router } = require('express');
const {check} = require('express-validator');
const { existeCategoria } = require('../helpers/db-validators');

const { 
    validarCampos,
    validarJWT,
    esAdminRole,
} = require('../middlewares');

const { 
        categoriasGetAll,
        categoriasGetOne,
        categoriasPost,
        categoriasPut,
        categoriasDelete,
     } = require('../controllers/categorias');


const router = Router();
//publico
router.get('/' , categoriasGetAll );


router.get('/:id' ,[
    check('id','el id no es valido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
] ,categoriasGetOne );

//privado con token valido
router.post('/' ,[
    validarJWT,
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    validarCampos
], categoriasPost );

router.put('/:id' ,[
    validarJWT,
    check('id','el id no es valido').isMongoId(),
    check('id').custom( existeCategoria ),
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    validarCampos,
], categoriasPut );

//solo admin
router.delete('/:id' ,[
    validarJWT,
    esAdminRole,
    check('id','el id no es valido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], categoriasDelete );

module.exports = router;