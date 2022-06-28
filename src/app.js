const path = require('path');
const express = require('express');
const mainRouter = require('./routes/mainRouter');
const productsRoutes = require('./routes/productsRoutes')
const userRouters = require('./routes/userRoutes')

const mdEjemplo = require("./middleware/mdEjemplo");

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log('Server corriendo en port: ', PORT);
})

app.use(express.static(path.join(__dirname, '../public')));

// Setup del req.body
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//Middleware
app.use(mdEjemplo);


// ruta home
app.use(mainRouter);

// products
app.use('/products', productsRoutes);

// Users
app.use('/users', userRouters)

