const express = require('express');
const userController = require('../../controllers/user.controller');
const { authondication } = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get('/profile', authondication, userController.userProfile);

module.exports = router;
