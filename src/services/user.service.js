const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model');
const Note = require('../models/note.models');

const createUser = async (userBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.create(userBody);
      resolve(user);
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        if (error.keyValue.email) {
          reject(new ApiError(httpStatus.BAD_REQUEST, 'Email is already registered'));
        } else if (error.keyValue.phone) {
          reject(new ApiError(httpStatus.BAD_REQUEST, 'Phone is already registered'));
        }
      }
      return reject(error);
    }
  });
};

const getUserByEmail = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        reject(new ApiError(httpStatus.NOT_FOUND, 'Register first of all'));
      }
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { createUser, getUserByEmail };
