const jwt = require("jsonwebtoken");
const userSecret = process.env.USER_SECRET || "userAuth0";

// Create user access token
const jwtSign = async (data) => {
  return jwt.sign(data, userSecret, { expiresIn: "3600s" });
};

// Verify access token
const userAuth = (req, res, next) => {
  try {
    let token = req.headers.accesstoken;
    jwt.verify(token, userSecret, (err, decode) => {
      if (err) return res.status(401).send({ message: "Invalid token" });
      req.user = decode;
      next();
      return;
    });
  } catch (error) {
    return res.status(401).send({ message: error });
  }
};

module.exports = {
  jwtSign,
  userAuth,
};