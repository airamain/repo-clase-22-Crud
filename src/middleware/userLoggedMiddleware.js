function userLoggedMiddleware ( req, res, next ) {

    res.locals.isUserLogged = false;

    if (req.session.userLogged !== undefined) {
        res.locals.isUserLogged = true;
        res.locals.userData = {
            name: req.session.userLogged.fullname,
            avatar: req.session.userLogged.avatar
        }
    }
    
    next();
}

module.exports = userLoggedMiddleware;