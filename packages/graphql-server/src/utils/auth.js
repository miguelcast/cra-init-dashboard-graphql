const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

function validateIsAuthWithError(ctx) {
  if (!ctx || !ctx.user) {
    throw new AuthenticationError('No authorization token');
  }
}

function getToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.SECRET_JWT,
    {
      expiresIn: '30d', // token will expire in 30days
    }
  );
}

module.exports = {
  validateIsAuthWithError,
  getToken,
};
