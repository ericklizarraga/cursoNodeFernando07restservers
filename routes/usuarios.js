const { Router } = require('express');
const { usauriosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');


const router = Router();


router.get('/',  usauriosGet );

router.post('/', usuariosPost );

router.put('/:id',  usuariosPut );

router.delete('/', usuariosDelete );

module.exports = router;