
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
   
    constructor(){
        this.app = express()
        this.port =  process.env.PORT;
        
        this.pahts = {
            auth        :   '/api/auth',
            buscar  :   '/api/buscar',
            categorias  :   '/api/categorias',
            productos    :   '/api/productos',
            usuarios    :   '/api/usuarios'
        }

        //conectar a base de datos
        this.conectarDB();

        //middlewares
        this.middlewares();

        //rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //cors
        this.app.use( cors() );
        
        //parseo y lectura de body
        this.app.use( express.json() );

        //directorio publico
        this.app.use( express.static('public') );
    }

    routes(){

        this.app.use( this.pahts.auth, require('../routes/auth') );
        this.app.use( this.pahts.buscar, require('../routes/buscar') );
        this.app.use( this.pahts.categorias, require('../routes/categorias') );
        this.app.use( this.pahts.productos, require('../routes/productos') );
        this.app.use( this.pahts.usuarios , require('../routes/usuarios') );
    }

    listen(){
        this.app.listen( this.port , ()=>{
            console.log('Server Run On', this.port );
        });
    }
}


module.exports = Server;