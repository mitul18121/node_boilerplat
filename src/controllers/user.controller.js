const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const userService = require('../services/user.service');

const userProfile = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.userEmail);
    if (!user) {
      throw new ApiError({ status: httpStatus.NOT_FOUND, message: 'Register first of all' });
    }
    res.status(httpStatus.OK).send(user);
  } catch (error) {
    res.status(error.status || 500).send({ status: error.status, message: error.message });
  }
};

module.exports = { userProfile };
