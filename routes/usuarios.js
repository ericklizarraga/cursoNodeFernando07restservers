const { Router } = require('express');
const {check} = require('express-validator');
const { usauriosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');


const router = Router();


router.get('/',  usauriosGet );

router.post('/',[
     check('correo','el correo no es valido').isEmail(),
], usuariosPost );

router.put('/:id',  usuariosPut );

router.delete('/', usuariosDelete );

module.exports = router;