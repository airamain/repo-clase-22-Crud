const { Router } = require('express'); // object destructuring
const mainController = require('../controllers/mainController');
const mainRouter = Router();


mainRouter.get('/', mainController.home);//esto

mainRouter.get('/datail/:id', mainController.detail);

module.exports = mainRouter;

