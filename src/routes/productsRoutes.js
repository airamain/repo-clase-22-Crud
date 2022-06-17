const express = require('express');
const router = express.Router();
const path = require('path');

const multer = require('multer');
const myStorage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './public/uploads/') // customizamos nuesta storage... 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.fieldname + path.extname(file.originalname))
    }
});

const uploads = multer({storage: myStorage});

const controller = require('../controllers/productsController');

// GET - localhost:3000/products
router.get('/', controller.browse);

// GET - localhost:3000/products/create => redirecciona una view en el controller
router.get('/create', controller.create);
// POST - localhost:3000/products
router.post('/', uploads.single('productImage') ,controller.add);

// GET - localhost:3000/products/edit/:id
router.get('/edit/:id', controller.edit);
// PUT - localhost:3000/products/id
router.put('/:id', controller.update);

// GET - localhost:3000/products/:id
router.get('/:id', controller.read);

// DELETE - localhost:3000/products/:id
router.delete('/:id', controller.delete);

module.exports = router;