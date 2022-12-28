const validateUserAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        res.status(400).json( {
            data : {},
            success : false,
            message : 'Something went wrong',
            err : 'Email or Password is missin'
        })
    }
    next();
}

module.exports = {
    validateUserAuth
}