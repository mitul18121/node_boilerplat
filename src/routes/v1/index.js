const express = require('express');
const docsRoute = require('./docs.route');
const noteRoute = require('./note.route');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
// const { authondication } = require('../../middlewares/auth.middleware');

const router = express.Router();

router.use('/docs', docsRoute);
router.use('/note', noteRoute);
router.use('/user', userRoute);
router.use('/auth', authRoute);

module.exports = router;
