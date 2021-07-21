const express = require('express');
const authController = require('../../controllers/auth.controller');
const validate = require('../../middlewares/validate');

const { login, register, logout } = require('../../validations/auth.validation');

const router = express.Router();

router.post('/login', validate(login), authController.login);
router.post('/register', validate(register), authController.register);
router.post('/logout', validate(logout), authController.logout);

module.exports = router;
