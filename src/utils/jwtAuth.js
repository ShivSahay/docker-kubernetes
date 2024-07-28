const jwt = require("jsonwebtoken");
const userSecret = process.env.USER_SECRET || "userAuth0";

exports.jwtSign = async (data) => {
  return jwt.sign(data, userSecret);
};

exports.userAuth = (req, res, next) => {
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
