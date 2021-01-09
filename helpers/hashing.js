const bcr = require('bcryptjs');

function hashingPassword(password, cb) {
    bcr.genSalt(10, function (err, salt) {
        if (err) {
            cb(err, null)
        }else {
            bcr.hash(password, salt, function (err, hash) {
                if (err) {
                    cb(err, null)
                }else {
                    console.log(hash)
                    cb(null, hash)
                }
            })
        }
    })
};


function getHash(pass) {
    let salt = bcr.genSaltSync(10);
    return bcr.hashSync(pass, salt)
}

function checkPassword(password, hash, cb) {
    bcr.compare(password, hash, function(err, res) {
        if (err) {
            cb(err, null);
        }else {
            cb(null, res);
        }
    });
};

module.exports = {
    hashingPassword,
    checkPassword,
    getHash
};