
const { User } = require('../models/index');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const ValidationError = require('../utils/validation-error');
const ClientError = require('../utils/client.error');
const { StatusCodes } = require('http-status-codes');

class UserRepository {

    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if(error.name === 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            console.log('Something went wrong in the repository layer');
            throw {error}
        }
    }

    async destroy(dataId) {
        try {
            await User.destroy({ where : {
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

    async getByEmail(dataEmail) {
        try {
            const user = await User.findOne({ where : {
                    email : dataEmail
                }
            });
            if(!user) {
                throw new ClientError(
                    'Attribute not found',
                    'Invalid email sent in the request',
                    'Please check the email, there is no record of this email',
                    StatusCodes.NOT_FOUND
                )
            }
            return user;
        } catch (error) {
            console.log('Something went wrong in the repo layer');
            throw error;
        }
    }

    async isAdmin(userId) {
        try {
            const user = User.findByPk(userId);
            const adminRole = Role.findOne( { where :
            {
                name : 'ADMIN'
            }})
            return user.hasRole(adminRole);
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw error;
        }
    }
}

module.exports = UserRepository;