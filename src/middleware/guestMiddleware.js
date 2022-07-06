function guestMiddleware (req, res, next) {
    //verificamos si esta logueado
    if (req.session.userLogged !== undefined) {
        return res.redirect("/users/profile")
    }
    next();
}
        

module.exports = guestMiddleware;