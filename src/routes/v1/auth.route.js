const express = require('express');
const validate = require('../../middlewares/validate');
const authController = require('../../controllers/auth.controller');
const { createUser } = require('../../validations/auth.validation');

const router = express.Router();

router.route('/register').post(validate(createUser), authController.createUser);

module.exports = router;
