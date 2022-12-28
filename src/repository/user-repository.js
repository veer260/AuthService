
const { User } = require('../models/index');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');

class UserRepository {

    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw {error}
        }
    }

    async destroy(dataId) {
        try {
            await User.destroy({
                where : {
                    id : dataId,
                }
            });
            return true;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw {error}            
        }
    }

    async getById(dataId) {
        try {
            const user = await User.findByPk(dataId, {
                attributes : ['email', 'id']
            })
            return user;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw {error}  
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn : '1h'} );
            return result;
        } catch (error) {
            console.log('Something went wrong in the token creation');
            throw {error};            
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log('Something went wrong in token verification', error);
            throw {error}
        }
    }


}

module.exports = UserRepository;