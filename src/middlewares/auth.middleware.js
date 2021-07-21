const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model');
require('dotenv').config();

const authondication = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      next(new ApiError(httpStatus.BAD_REQUEST, 'Unauthorized user'));
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    const verify = await User.findOne({
      email: decodeToken.payload.email,
    });
    const userEmail = decodeToken.payload.email;
    req.userEmail = userEmail;
    req.user_id = decodeToken.payload.id;

    if (!verify || !verify.token) {
      next(new ApiError(httpStatus.BAD_REQUEST, 'Unauthorized user'));
    } else {
      if (verify.token !== token) {
        next(new ApiError(httpStatus.BAD_REQUEST, 'Unauthorized user'));
      } else {
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authondication };
