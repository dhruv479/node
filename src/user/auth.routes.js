const router = require('express').Router();

const {
  loginUserController,
  registerUserController,
} = require('./user.controller');

router.post('/register', registerUserController);
router.post('/login', loginUserController);

module.exports = router;
