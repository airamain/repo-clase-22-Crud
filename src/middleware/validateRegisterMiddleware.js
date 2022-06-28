const path = require('path');
const { check } = require('express-validator');

module.exports = [
    check('fullname').notEmpty().withMessage('El nombre es obligatorio'),
    check('email')
    .notEmpty().withMessage('El correo es obligatorio').bail()
    .isEmail().withMessage('Formato erroneo del correo'),
    check('password')
    .notEmpty().withMessage('Escribir contraseña').bail()
    .custom((value, { req }) => {
        if(value !== req.body.rePassword){
            throw new Error('Contraseñas no coinciden') 
           /*  Un objeto Error representa un error y tiene propiedades asociadas (por ejemplo propiedades que informan del tipo de error de que se trata). Normalmente un error no se crea y “se guarda”, sino que un error “se lanza” (is thrown). */
        }
        return true;
    }),
    check('rePassword')
    .custom((value, { req }) => {
        if(req.body.password !== "" && value !== req.body.password){
            throw new Error('Contraseñas no coinciden') 
        }
        return true;
    }),
    check('avatar')
    .custom((value, { req }) =>{
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];

        if(!file){
            throw new Error('Tenes que subir tu avatar');
        } else {
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones permitas son ${acceptedExtensions.join(', ')}`)
            }
        }
        return true;
    })
  
]