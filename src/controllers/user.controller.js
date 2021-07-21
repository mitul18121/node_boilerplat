const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const userService = require('../services/user.service');

const userProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserByEmail(req.userEmail);
    if (!user) {
      return next(new ApiError(user.error.statusCode, user.error.message));
    }
    res.status(httpStatus.OK).send(user);
  } catch (error) {
    if (error instanceof ApiError) {
      return next(new ApiError(error.statusCode, error.message));
    }
    next(error);
  }
};

module.exports = { userProfile };
