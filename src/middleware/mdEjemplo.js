//MD de ejemplo
function mdEjemplo (req, res, next) {
    console.log("MD de aplicacion");
    next();
};

module.exports = mdEjemplo;