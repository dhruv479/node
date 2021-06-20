const router = require('express').Router();

const authRouter = require('./user/auth.routes');
const userRouter = require('./user/user.routes');

router.use('/auth', authRouter);
router.use('/user', userRouter);

module.exports = router;
