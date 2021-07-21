const jwt = require('jsonwebtoken');
require('dotenv').config();

const token = async (payload) => {
  return jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = token;
