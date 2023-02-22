const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "hell", (err, decoded) => {
      if (decoded) {
        req.body.owner = decoded.User;
        return next();
      } else {
        return res.send({ msg: "wrong token" });
      }
    });
  } else {
    return res.send("please login first"); 
  }
};

module.exports = {
  authenticate
};