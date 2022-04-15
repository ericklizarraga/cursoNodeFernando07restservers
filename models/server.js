
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
   
    constructor(){
        this.app = express()
        this.port =  process.env.PORT;
        
        this.authPath = '/api/auth';
        this.usuariosPath = '/api/usuarios';

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

        this.app.use( this.authPath , require('../routes/auth') );
        this.app.use( this.usuariosPath , require('../routes/usuarios') );
    }

    listen(){
        this.app.listen( this.port , ()=>{
            console.log('Server Run On', this.port );
        });
    }
}


module.exports = Server;