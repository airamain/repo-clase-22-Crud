function authMiddleware (req, res, next) {
    //verificamos si esta logueado
    if (req.session.userLogged === undefined) {
        return res.redirect("/users/login")
    }
    next();
}
        

module.exports = authMiddleware;