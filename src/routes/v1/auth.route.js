const express = require('express');
const authController = require('../../controllers/auth.controller');
const validate = require('../../middlewares/validate');
const upload = require('../../utils/multer');
const { login, logout, register } = require('../../validations/auth.validation');

const router = express.Router();

router.post('/login', validate(login), authController.login);
router.post('/register', upload.single('profile_url'), authController.register);
router.post('/logout', validate(logout), authController.logout);

module.exports = router;

// validate(register)
