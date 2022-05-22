const path = require('path');
const { v4 : uuidv4 } = require('uuid');


const subirArchivo = ( files,extencionesValidas = ['png','jpg','jpeg','gif'], carpeta ='' ) => new Promise(
    
    ( resolve, reject ) => {

        const { archivo } = files;
        const nombrecortado = archivo.name.split('.');
        const extencion = nombrecortado[ nombrecortado.length -1 ];

        if( !extencionesValidas.includes( extencion.toLowerCase() ) ) {
            return reject( `la extencion (${extencion}) no es valida, solo imagenes:[ ${extencionesValidas} ]`);
        }

        
            const nombreFile = uuidv4()+'.'+extencion;
            const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreFile );

            archivo.mv(uploadPath, (err)=> {
                if (err){
                    return reject(err);
                }

                return resolve( nombreFile );
            });
    }
);


module.exports = {
    subirArchivo,
}