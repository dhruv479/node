const { verifyUser } = require('../utils/token');
const { userListController } = require('./user.controller');
const { UserTypes } = require('./user.model');

const router = require('express').Router();

// allowing only admin user for operation
router.get('/list', verifyUser([UserTypes.ADMIN]), userListController);

module.exports = router;
