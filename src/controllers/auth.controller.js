const httpStatus = require('http-status');
const AuthService = require('../services/auth.service');
const ApiError = require('../utils/ApiError');
const token = require('../utils/jwtToken');
const register = async (req, res) => {
  try {
    const user = await AuthService.register(req.body);
    if (user && user.error) {
      throw new ApiError({ status: httpStatus.BAD_REQUEST, message: 'Something went wrong' });
    }
    return res.status(httpStatus.CREATED).send({ status: httpStatus.OK, messgae: 'Register successfully', data: user });
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(error.status || 500).send({ status: error.status, message: 'This email allready registered' });
    }
    res.status(error.status || 500).send({ status: error.status, message: error.message });
  }
};

/* const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.loginWithEmail(email, password);
    if (!user && user.error) {
      return next(new ApiError(user.error.statusCode, user.error.message));
    }
    const parama = {
      id: user._id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      role: user.role,
      isactive: user.isactive,
    };
    const authToken = await token(parama);
    const storeToken = await AuthService.updateDerails(user._id, { token: authToken });
    res.status(httpStatus.OK).send({ storeToken });
  } catch (error) {
    if (error instanceof ApiError) {
      return next(new ApiError(error.statusCode, error.message));
    }
    next(error);
  }
}; */

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.loginWithEmail(email, password);
    if (!user && user.error) {
      throw new ApiError({
        status: httpStatus.BAD_REQUEST,
        message: 'Email and password is not match',
      });
    }
    const parama = {
      id: user._id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      role: user.role,
      isactive: user.isactive,
    };
    const authToken = await token(parama);
    const storeToken = await AuthService.updateDerails(user._id, { token: authToken });
    res.status(httpStatus.OK).send({ status: httpStatus.OK, messgae: 'Register successfully', data: storeToken });
  } catch (error) {
    res.status(error.status || 500).send({ status: error.status, message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await AuthService.updateDerails(_id, { token: null });
    if (!user) {
      throw new ApiError({ status: httpStatus.BAD_REQUEST, message: 'Unauthorised user' });
    }
    res.status(httpStatus.OK).send({ status: httpStatus.OK, messgae: 'Logout successfully' });
  } catch (error) {
    res.status(error.status || 500).send({ status: error.status, message: error.message });
  }
};

module.exports = { register, login, logout };
