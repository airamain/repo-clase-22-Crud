const path = require('path');
const express = require('express');
const mainRouter = require('./routes/mainRouter');
const productsRoutes = require('./routes/productsRoutes')

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

// ruta home
app.use(mainRouter);
app.use('/products', productsRoutes);

