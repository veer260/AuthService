const express = require('express');
const UserController = require('../../controllers/user-controller');
const { AuthRequestValidators } = require('../../middlewares/index') 

const router = express.Router();

router.post('/signup',
    AuthRequestValidators.validateUserAuth,
    UserController.create
 );
router.post('/signin',
    AuthRequestValidators.validateUserAuth,
    UserController.signin
);

router.get('/isAutheticated', UserController.isAuthenticated);

router.get('/isAdmin', 
    AuthRequestValidators.validateIsAdminRequest,
    UserController.isAdmin
);
module.exports = router;