const express = require('express');
const docsRoute = require('./docs.route');
const noteRoute = require('./note.route');
const authRoute = require('./auth.route');

const router = express.Router();

router.use('/docs', docsRoute);
router.use('/note', noteRoute);
router.use('/auth', authRoute);

module.exports = router;
