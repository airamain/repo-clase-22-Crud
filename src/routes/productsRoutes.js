const express = require('express');
const router = express.Router();

const controller = require('../controllers/productsController');

// GET - localhost:3000/products
router.get('/', controller.browse);

// GET - localhost:3000/products/create => redirecciona una view en el controller
router.get('/create', controller.create);
// POST - localhost:3000/products
router.post('/', controller.add);

// GET - localhost:3000/products/edit/:id
router.get('/edit/:id', controller.edit);
// PUT - localhost:3000/products/id
router.put('/:id', controller.update);

// GET - localhost:3000/products/:id
router.get('/:id', controller.read);

// DELETE - localhost:3000/products/:id
router.delete('/:id', controller.delete);

module.exports = router;