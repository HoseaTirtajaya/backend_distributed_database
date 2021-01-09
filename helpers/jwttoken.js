const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET_CODE;

function generateToken(payload, cb) {
    jwt.sign(payload, SECRET, function (err, token) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, token);
        }
    });
};

function verifyToken(token, cb) {
    jwt.verify(token, SECRET, function (err, decoded) {
        if (err) {
            cb(err, null)
        } else {
            cb(null, decoded)
        }
    })
};

module.exports = {
    generateToken,
    verifyToken
};