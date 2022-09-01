const jwt = require('jsonwebtoken');
const JWT_SECRET = proses.env.JWT_SECRET;

module.exports = (payload) => {
   delete payload.password;
   const token = jwt.sign(payload, JWT_SECRET, { expiresIn: `24h` });
   return token;
};
