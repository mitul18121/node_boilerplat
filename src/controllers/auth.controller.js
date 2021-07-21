const httpStatus = require('http-status');
const AuthService = require('../services/auth.service');
const ApiError = require('../utils/ApiError');
const token = require('../utils/jwtToken');
const UserService = require('../services/user.service');

const register = async (req, res, next) => {
  try {
    const user = await UserService.createUser(req.body);
    if (user && user.error) {
      return next(new ApiError(user.error.statusCode, user.error.message));
    }
    return res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    if (error instanceof ApiError) {
      return next(new ApiError(error.statusCode, error.message));
    }
    next(error);
  }
};

const login = async (req, res, next) => {
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
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const user = await AuthService.updateDerails(_id, { token: null });
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

module.exports = { register, login, logout };
