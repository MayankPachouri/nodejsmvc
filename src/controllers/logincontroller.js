const passport = require("passport");
const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");

//For Register Page
const registerView = (req, res) => {
  res.render("register", {});
};

//Post Request for Register

const registerUser = (req, res) => {
  console.log(req);
  const { name, email, location, password, confirm } = req.body;

  if (!name || !email || !password || !confirm) {
    console.log("Fill empty fields");
  }

  //Confirm Passwords

  if (password !== confirm) {
    console.log("Password must match");
  } else {
      User.findOne(email, function(err, user) {
        //console.log(user);
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
              User.create(newUser, function(err, user) {
                if (err)
                res.send(err);
                res.json({error:false,message:"user added successfully!",data:user});
              });
            })
          ); 
        }
      });
  }
};

// For View
const loginView = (req, res) => {
  res.render("login", {});
};

//Logging in Function

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  //Required
  if (!email || !password) {
    console.log("email or password fields required");
    res.render("login", {
      email,
      password,
    });
  } else {
    passport.authenticate("local", {
      successRedirect: "/app/dashboard",
      failureRedirect: "/app/login",
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