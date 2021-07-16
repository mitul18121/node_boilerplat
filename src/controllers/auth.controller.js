const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const AuthService = require('../services/auth.service');

const createUser = async (req, res, next) => {
  try {
    const user = await AuthService.createUser(req.body);
    if (user && user.error) {
      return next(new ApiError(user.error.statusCode, user.error.message));
    }
    return res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    if (error instanceof ApiError) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
};

module.exports = { createUser };
