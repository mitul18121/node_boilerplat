const httpStatus = require('http-status');
const userService = require('./user.service');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');

/* const loginWithEmail = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await userService.getUserByEmail(email);
      if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
      }
      resolve(user);
    } catch (error) {
      if (error.name === 'MongoError') {
        reject(new ApiError(httpStatus.BAD_REQUEST, 'Email must be unique'));
      }
      reject(error);
    }
  });
}; */

const register = async (userBody) => {
  const user = await User.create(userBody);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Somthing is wrong');
  }
  return user;
};

const loginWithEmail = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect email or password');
  }
  return user;
};

const updateDerails = async (userId, updateBody) => {
  const user = await User.findOneAndUpdate(userId, { updateBody, new: true });
  if (!user) {
    throw new ApiError(httpStatus.NOTFOUND, 'Note not found');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

module.exports = { register, loginWithEmail, updateDerails };
