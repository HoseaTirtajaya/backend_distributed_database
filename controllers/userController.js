const User = require("../models/userRelated/User");
const { generateToken, verifyToken } = require("../helpers/jwttoken");
const { checkPassword } = require("../helpers/hashing");

class userController {
    static createUser(req, res, next){
        let { full_name, phone_no, gender, email, password } = req.body;

        User.create({full_name, phone_no, gender, email, password}).then((user) => {
            req.payload = {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
            };
            next();
        }).catch(next);
    }

    static loginUser(req, res, next){
        let { email, password } = req.body;

        User.findOne({email: email})
        .then((user) => {
            if(user){
                if(user.verified){
                    checkPassword(password, user.password, (err, result) => {
                        if (err){
                          next({err});  
                        } 

                        if(result){
                            let payload = {id: user.id, fullname: user.full_name};
                            generateToken(payload, (err, token) => {
                                if (err){
                                    next({err})
                                } else {
                                    res.status(200).json({token});
                                }
                            })
                        } else {
                            res.status(400).json({message: "Wrong Password."});
                        }
                    })
                }
            } else {
                res.status(400).json({message: "User not found"});
            }
        }).catch(next);
    }

    static updateVerification(req, res, next){
        verifyToken(req.params.token, (err, result) => {
            if(err){
                next({err})
            } else {
                let decoded = result;
                User.findOneAndUpdate({_id: decoded.id}, {verified: true}, {omitUndefined: true, new: true})
                .then(() => {
                    res.status(200).redirect("https://distributeddatabaseproject.netlify.app/");
                }).catch(next);
            }
        });
    }
}

module.exports = userController