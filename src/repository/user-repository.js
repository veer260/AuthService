
const { User } = require('../models/index');

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
}

module.exports = UserRepository;