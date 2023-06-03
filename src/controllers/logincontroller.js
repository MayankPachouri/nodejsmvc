const passport = require("passport");
const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");

//For Register Page
const registerView = (req, res) => {
  res.render("register", {});
};

//Post Request for Register

const registerUser = (req, res) => {
  const { name, email, location, password, confirm } = req.body;

  if (!name || !email || !password || !confirm) {
    console.log("Fill empty fields");
  }
  console.log(req);
  //Confirm Passwords

  if (password !== confirm) {
    console.log("Password must match");
  } else {
    //Validation
    exports.findOne = function(req, res) {
        User.findOne(email, function(err, user) {
            if (user) {
                console.log("email exists");
                res.render("register", {
                  name,
                  email,
                  password,
                  confirm,
                });
              } else {
                //Validation
                const newUser = new User({
                  name,
                  email,
                  location,
                  password,
                });
                //Password Hashing
                bcrypt.genSalt(10, (err, salt) =>
                  bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                      .save()
                      .then(res.redirect("/web/login"))
                      .catch((err) => console.log(err));
                  })
                );
              }
        });
    };
  }
};

// For View
const loginView = (req, res) => {
  res.render("login", {});
};

//Logging in Function

const loginUser = (req, res) => {
  const { email, password } = req.body;

  //Required
  if (!email || !password) {
    console.log("Please fill in all the fields");
    res.render("login", {
      email,
      password,
    });
  } else {
    passport.authenticate("local", {
      successRedirect: "/web/dashboard",
      failureRedirect: "/web/login",
      failureFlash: true,
    })(req, res);
  }
};

module.exports = {
  registerView,
  loginView,
  registerUser,
  loginUser,
};