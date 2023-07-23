const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function verifyAuthTokenMiddleware(req, res, next) {
  try {
    const bearToken = req.headers.authorization;
    // "Bearer token"
    if (!bearToken)
      return res.status(401).json({
        message: "No token added",
      });
    const tokenArr = bearToken.split(" ");

    const token = tokenArr[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET); //secret key

    const user = await User.findOne({ _id: payload.id });

    if (!user)
      return res.status(400).json({
        success: false,
        message: "User does not exist",
        statusCode: 400,
      });
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    if (error.message == "jwt expired") {
      return res.status(401).json({
        message: error.message,
      });
    }
    if (error.message === "invalid signature") {
      return res.status(401).json({
        message: "invalid token",
      });
    }
    next(error);
  }
}

module.exports = { verifyAuthTokenMiddleware };
