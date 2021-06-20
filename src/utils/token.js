const { TOKEN_KEY, TOKEN_DURATION } = require('../../config/keys');
const Boom = require('@hapi/boom');

const jwt = require('jsonwebtoken');
const { UserTypes } = require('../user/user.model');

const verifyUser = (roles = [UserTypes.ADMIN, UserTypes.USER]) => {
  return async (req, res, next) => {
    const header = req.headers.authorization;
    try {
      if (!header) {
        throw Boom.forbidden();
      }

      const [scheme, token] = header.split(' ');
      if (scheme !== 'Bearer') {
        throw Boom.forbidden();
      }
      const tokenPayload = await jwt.verify(token, TOKEN_KEY, {
        algorithms: ['HS256'],
      });

      if (tokenPayload) {
        if (roles.indexOf(tokenPayload.type) === -1) {
          next(Boom.unauthorized('Request not permitted'));
        }
        res.locals.USER = tokenPayload;
        return next();
      }
    } catch (err) {
      next(Boom.unauthorized('Unauthorized Access! Please login.'));
    }
  };
};

const createToken = (data) => {
  return jwt.sign(data, TOKEN_KEY, {
    expiresIn: TOKEN_DURATION,
  });
};

module.exports = { verifyUser, createToken };
