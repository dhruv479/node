const { UserModel } = require('./user.model');
const { createToken } = require('../utils/token');
const { compareHash, generateHash } = require('../utils/Pasword');
const Boom = require('@hapi/boom');

// ---------------------   REGISTER CONTROLLER    ----------------------------
const registerUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await UserModel.find({ email }).lean();
    if (userExist[0]) {
      throw Boom.conflict('User already exists, try to login');
    }

    const hash = await generateHash(password);

    await new UserModel({
      name,
      email,
      password: hash,
    }).save();

    return res.status(200).json({
      success: true,
      message: 'User is now created! try to login',
    });
  } catch (err) {
    next(err);
  }
};

// ----------------------------   LOGIN CONTROLLER    ----------------------------
const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await UserModel.findOne({
      email,
    }).lean();

    if (!userExist) {
      throw Boom.unauthorized("User doesn't exist");
    }

    const isMatch = await compareHash(password, userExist.password);

    if (!isMatch) {
      throw Boom.unauthorized('Incorrect Password, Contact Admin to Reset');
    }
    const payload = {
      id: userExist._id,
      name: userExist.name,
      email: userExist.email,
      type: userExist.type,
    };

    const token = await createToken(payload);

    return res.status(200).json({
      success: true,
      isLoggedIn: true,
      message: 'Logged In Successfully',
      data: {
        auth: token,
        payload,
      },
    });
  } catch (err) {
    next(err);
  }
};

const userListController = async (req, res, next) => {
  try {
    const userList = await UserModel.find().select({ password: 0 }).lean();

    return res.json({ success: true, data: userList });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  loginUserController,
  registerUserController,
  userListController,
};
