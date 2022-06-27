const path = require('path');
const multer = require('multer');

const myStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../public/uploads/avatars')) // customizamos nuesta storage... 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.fieldname + path.extname(file.originalname))
    }
});

let maxSize = 10024;
const uploadFile = multer({
    storage: myStorage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        let type = file.mimetype.startsWith('image/');
        type ? cb(null, true) : cb(new Error('No es un archivo permitido'))
    }
});

module.exports = uploadFile;