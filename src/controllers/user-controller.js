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
        console.log(error);
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


module.exports = {
    create,
    signin
}