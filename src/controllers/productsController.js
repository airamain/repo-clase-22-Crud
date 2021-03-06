const { json } = require('express');
const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

const filePath = path.resolve(__dirname, '../data/products.json');
const productArray = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const controller = {
    browse: (req, res) => {
        res.send('estamos en /products');
    },
    read: (req, res) => {
        const productId = req.params.id
        res.send('estamos en /products/' + productId);
    },
    create: (req, res) => {
        //res.send('Estoy en FORMULARIO para crear producto');
        res.render('create')
    },
    edit: (req, res) => {
        const productId = req.params.id
        res.send('formulario que edita un producto' + productId);
    },
    add: (req, res) => {
        const arrayErrors = validationResult(req);

        if (arrayErrors.errors.length > 0) {
             return res.render('create', {
                messageErrors: arrayErrors.mapped(),
                oldBodyData: req.body
            });
        }

        productArray.push(
            {
                pdtName: req.body.pdtName,
                pdtPrice: req.body.pdtPrice

            }
        )
        fs.writeFileSync(filePath, JSON.stringify(productArray, null, ''))
        console.log('Se gaurdo el dato ok');

        //  Y luego rediecionar
        res.redirect('/products?saved=true');

    },
    update: (req, res) => {
        const productId = req.params.id
        res.send('vamos actualizar del producto' + productId);
    },
    delete: (req, res) => {
        const productId = req.params.id
        res.send('vamos eliminar / borrar del producto' + productId);
    }
}

module.exports = controller;