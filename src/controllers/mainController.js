
const products = [
    {
        id: 1,
        name: "Carpaccio fresco",
        description: "Entrada Carpaccio de salmón con cítricos",
        price: 65.50
    },
    {
        id: 2,
        name: "Risotto de berenjena",
        description: "Risotto de berenjena y queso de cabra ",
        price:  47.00
    },
    {
        id: 3,
        name: "Mousse de arroz",
        description: " Mousse de arroz con leche y aroma de azahar ",
        price: 27.50
    },
    {
        id: 4,
        name: "Espárragos blancos",
        description: " Espárragos blancos con vinagreta de verduras y jamón ibérico",
        price:  37.50
    }
]

module.exports = {
    home: (req, res) => {
        res.render('index', { products: products })
    },
    detail: (req, res) => {
        // MAGIA!! de mis alumnos!!!
        // req.paramas.id ...
        // funcion  find () devuelve objeto
    }
}