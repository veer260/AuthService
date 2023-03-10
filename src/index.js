const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const { User, Role } = require('./models/index');

const apiRoutes = require('./routes/index')
const db = require('./models/index');

const prepareAndStartServer = () => {


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}))

    app.use('/api', apiRoutes);

    app.listen(PORT, async() => {
        if(process.env.DB_SYNC){
            db.sequelize.sync({ alter: true});
        }

        // const u1 = await User.findByPk(4);
        // const r1 = await Role.findByPk(2);
        // r1.addUser(u1);
        // const user = await User.findOne({
        //     where : {
        //         id : 3
        //     }
        // })

        // // const 
        // console.log(user.dataValues);
        // const role = await Role.findOne({
        //     where : {
        //         name : 'ADMIN'
        //     }
        // })
        // console.log(role);
        // const isAdmin = await user.hasRole(role);
        // console.log(isAdmin);
        // console.log(user.hasRole())
        console.log(`Server started at PORT : ${PORT}`);
    })
}

prepareAndStartServer();