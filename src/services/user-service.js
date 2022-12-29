const  UserRepository  = require('../repository/user-repository');
const bcrypt = require('bcrypt');
const { JWT_KEY } = require('../config/serverConfig');
const jwt = require('jsonwebtoken');
const AppErrors = require('../utils/error-handler');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError') {
                throw error;
            }
            console.log('Something went wrong in the service layer');
            throw new AppErrors (
                'ServerError',
                'Something went wrong in service',
                'Logical issue found',
                500
            )
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

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log('Something went wrong in password checking');
            throw error;
        }
    }

    async signIn(email, userInputPlainPassword) {
        try {
            console.log('Hey');
            // Step 1 -> fetch the user using his email
            const user = await this.userRepository.getByEmail(email);
            //step 2 -> check the userInputPlainPassword with encryptedPassword
            const passwordMatch = this.checkPassword(userInputPlainPassword, user.password);
            if(!passwordMatch) {
                console.log("Password doesn't match");
                throw { error : 'Incorrect password'};
            }

            const newJWT = this.createToken({email : user.email, id : user.id}, JWT_KEY, { expiresIn : '1h'});
            return newJWT;
        } catch (error) {
            console.log('Something went wrong in the signin process');
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if(!response) {
                throw {error : 'Invalid Token'}
            }
            const user = await this.userRepository.getById(response.id);
            if(!user) {
                throw {error : 'No user with the correspondin token exists'};
            }
            console.log(user.id);
            return user.id;
        } catch (error) {
            console.log('Something is wrong in the Auth process');
            throw error
        }
    }

    async isAdmin(userId) {
        try {
            return await this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log('Something is wrong in the Service layer');
            throw error ;
        }
    }
}

module.exports = UserService;