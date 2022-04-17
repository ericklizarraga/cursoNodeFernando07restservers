const { Router } = require('express');
const {check} = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole , tieneRole } = require('../middlewares/validar-roles');

const { validarCampos, validarJWT, esAdmin , tieneRole } = require('../middlewares');

const { esRoleValido, emailExiste, existeUsuarioPorId, esmiCorreo } = require('../helpers/db-validators');

const {   usauriosGet,
          usuariosPost,
          usuariosPut,
          usuariosDelete } = require('../controllers/usuarios');
  //----------------------------------        

const router = Router();


router.get('/',  usauriosGet );

router.put('/:id', [
     check('id',' no es un ID valido').isMongoId(),
     check('id').custom( existeUsuarioPorId ),
     check('rol').custom( esRoleValido ),
     validarCampos
], usuariosPut );

router.post('/',[
     check('nombre','el nombre no es valido').not().isEmpty(),
     check('password','el password debe ser de mas de 6 caracteres').isLength({ min: 6}),
     check('correo','el correo no es valido').isEmail(),
     // check('rol','el rol no es valido').isIn(['ADMIN_ROLE','USER_ROLE']),
     check('rol').custom( esRoleValido ),
     check('correo').custom( emailExiste ),
     validarCampos
], usuariosPost );


router.delete('/:id',[
     validarJWT,
     tieneRole( 'ADMIN_ROLE','VENTAS_ROLE' ),
    // esAdminRole,
     check('id',' no es un ID valido').isMongoId(),
     check('id').custom( existeUsuarioPorId ),
     validarCampos
],
 usuariosDelete );

module.exports = router;