const User = require("../models/userRelated/User");

class userController {
    static createUser(req, res, next){
        let { full_name, phone_no, gender, email, password } = req.body;

        User.create({full_name, phone_no, gender, email, password}).then((user) => {
            req.payload = {
                id: user.id,
                email: user.email,
                full_name: user.first_name,
            };
            next();
        }).catch(next);
    }

    static loginUser(req, res, next){
        let { email, password } = req.body;

        User.findOne({email: email})
        .then((user) => {
            if(user){

            } else {
                res.status(400).json({message: "User not found"});
            }
        }).catch(next);
    }
}

module.exports = userController