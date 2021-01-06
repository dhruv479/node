const { TOKEN_KEY, TOKEN_DURATION } = require('../../config/keys');
const Boom = require('@hapi/boom');

const jwt = require('jsonwebtoken');

const verifyUser = async (req, res, next) => {
  const header = req.headers.authorization;
  try {
    if (!header) {
      throw Boom.forbidden();
    }

    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer') {
      throw Boom.forbidden();
    }
    const isVerified = await jwt.verify(token, TOKEN_KEY, {
      algorithms: ['HS256'],
    });

    if (isVerified) {
      res.USER = isVerified;
      return next();
    }
  } catch (err) {
    next(Boom.unauthorized('Unauthorized Access! Please login.'));
  }
};

const createToken = (data) => {
  return jwt.sign(data, TOKEN_KEY, {
    expiresIn: TOKEN_DURATION,
  });
};

module.exports = { verifyUser, createToken };
