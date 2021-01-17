const { verifyToken } = require("../helpers/jwttoken");

function userAuthentication(req, res, next) {
  if (req.headers.jwttoken) {
    let token = req.headers.jwttoken;
    verifyToken(token, function (err, result) {
      if (err) {
        next(err);
      } else {
        req.decoded = result;
        next();
      }
    });
  } else {
    next({ message: "Silahkan login terlebih dahulu" });
  }
}

//Authorization;

module.exports = {
  userAuthentication,
};
