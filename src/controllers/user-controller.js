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
        res.status(error.statusCode).json( {
            data : {},
            success : false,
            message : error.message,
            err : error.explaination
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
        res.status(error.statusCode).json( {
            data : {},
            success : false,
            message : error.message,
            err : error.explaination
    })     
    }
}

const isAdmin = async (req, res) => {
    try {
        const response = userService.isAdmin(req.body.id);
        res.status(200).json({
            data : response,
            success : true,
            message : "Successfully fetched whether user is admin or not",
            err : {}
        })
    } catch (error) {
        console.log(error);
            res.status(500).json( {
            data : {},
            success : false,
            message : "Something went wrong",
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
    isAuthenticated,
    isAdmin
}