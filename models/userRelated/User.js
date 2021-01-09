const mongoose = require("mongoose");
const { hashingPassword, getHash } = require("../../helpers/hashing");

let Schema = new mongoose.Schema({
    full_name: {
        type: String,
        required: [true, "Full Name must be written"]
    }, 
    phone_no: {
        type: String,
        required: [true, "Phone Number is required"]
    },
    gender: {
        type: String,
        required: [true, "Gender must be filled"]
    }, 
   email: {
    type: String,
    required: [true, "Email tidak boleh kosong"],
    trim: true,
    validate: [
      {
        validator: function (value) {
          const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          return email.test(value);
        },
        message: (props) =>
          `${props.value} is not valid email, please fill email correctly`,
      },
      {
        validator: function (value) {
          return this.model("User")
            .findOne({ email: value })
            .then(function (email) {
              if (email) {
                return false;
              } else {
                return true;
              }
            });
        },
        message: (props) =>
          `${props.value} has been used, please use another email`,
      },
    ],
  },
    password: {
        type: String,
        required: [true, "Password cannot be empty"],
        validate: {
        validator: function (value) {
            if (value.length < 4) {
            return false;
            } else {
            return true;
            }
        },
        message: (props) => `Password length must be larger or equal than 5`,
        },
    },
    verified: {
        type: Boolean,
        default: false
    }
});

Schema.pre("save", function (next) {
    hashingPassword(this.password, (err, newPass) => {
    this.password = newPass;
    next();
  });
});

let User = mongoose.model("User", Schema);
module.exports = User;