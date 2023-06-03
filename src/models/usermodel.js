'use strict';
var dbConn = require('./../../config/db.config');
//Employee object create
var User = function(user){
  this.name         = user.name;
  this.email        = user.email;
  this.password     = user.password;
  this.location     = user.location;
  this.date         = new Date();
};

User.create = function (newUsr, result) {
    dbConn.query("INSERT INTO user set ?", newUsr, function (err, res) {
    if(err) {
    console.log("error: ", err);
    result(err, null);
    }
    else{
    console.log(res.insertId);
    result(null, res.insertId);
    }
    });
};

User.findOne = function (email, result) {
dbConn.query("Select * from user where email = ? ", email, function (err, res) {
if(err) {
    console.log("error: ", err);
    result(err, null);
}
else{
    result(null, res);
}
});
};
module.exports = User;