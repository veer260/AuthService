const UserService = require('../services/user-service');
// const { UserService } = require('../services/user-service');

const userService = new UserService();

const create = async(req, res) => {
    try {
        const response = await userService.create({
            email : req.body.email,
            password : req.body.password
        });
        return res.status(200).json({
            data : response,
            success : true,
            message : "Successfully created a new user",
            err : {}
        })
    } catch (error) {
        res.status(500).json( {
            data : {},
            success : false,
            message : "Unable to create a user",
            err : {error}
        })       
    }
}

const signin = async(req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            data : response,
            success : true,
            message : "Successfully singed in as a user",
            err : {}
        })
    } catch (error) {
        console.log(error);
            res.status(500).json( {
            data : {},
            success : false,
            message : "Unable to signin as a user",
            err : {error}
    })     
    }
}


const isAuthenticated = async(req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success : true,
            data : response,
            message : 'user is authenticated and token is valid',
            err : {}
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            data : {},
            success : false,
            err : error,
            message : 'Something went wrong'
        })
    }
}


module.exports = {
    create,
    signin,
    isAuthenticated
}