const jwt = require("jsonwebtoken");

function generateToken(user) {
  const token = jwt.sign(
    {
      id: user._id.toString(),
    },
    process.env.JWT_SECRET, //secret key
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  return token;
}

module.exports = {
  generateToken,
};
