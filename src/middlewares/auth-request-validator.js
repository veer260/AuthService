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

const validateIsAdminRequest = (req, res, next) => {
    if(!req.body.id) {
        res.status(400).json({
            data : {},
            success : false,
            message : 'Something went wrong',
            err : 'userId not given'
        })
    }
    next();
}
module.exports = {
    validateUserAuth,
    validateIsAdminRequest
    
}