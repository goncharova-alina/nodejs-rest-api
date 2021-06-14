const rateLimit = require('express-rate-limit');
const { HttpCode } = require('./constants');
const { createAccountLimit } = require('../config/rate-limit.json');

const createAccountLimiter = rateLimit({
  windowMs: createAccountLimit.windowMs, // 1 hour
  max: createAccountLimit.max, // limit each IP to 5 create Account in an 1 hour
  handler: (req, res, next) => {
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message:
        'Too many accounts created from this IP please try again after an hour',
    });
  },
});

module.exports = { createAccountLimiter };