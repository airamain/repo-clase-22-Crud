const path = require('path');
const multer = require('multer');

const { existsSync } = require('fs');

const myStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../public/uploads/avatars')) // customizamos nuesta storage... 
    },
    filename: (req, file, cb) => {
        let extension = path.extname(file.originalname)
        let miFileName = Date.now() + '_' + file.fieldname;
        if (existsSync(path.resolve(__dirname, '../../public/uploads/avatars') + miFileName + extension))
            miFileName += '_' + new Date().getHours();
        cb(null, miFileName + extension)
    }
});

let maxSize = 10024;
const uploadFile = multer({
    storage: myStorage,
    limits: { fieldSize: maxSize },
    fileFilter: function (req, file, cb) {
        try {
            let type = file.mimetype.startsWith('image/');

            if (type)
                cb(null, true)
            else throw new Error('No es un archivo permitido')

        } catch (error) {
            cb(null, false);
        }
    }
});

module.exports = uploadFile;
