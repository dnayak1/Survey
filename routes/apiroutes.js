
var dbconnection = require('../dbconnection');
var connection = dbconnection.connection;
var jwt = require('jsonwebtoken');
var message;
exports.login = function(req,res){
  var email= req.body.email;
  var password = req.body.password;

  connection.query('SELECT * FROM user WHERE email = ? && password = ?',[email,password], function (error, results, fields) {
  if (error) {
    message = "error occured";
    res.send({
      "code":400,
      "message":message
    })
  }else{
    console.log(results);
    if(results.length > 0){
        connection.query('SELECT * FROM patient WHERE email = ?',[email], function (error, results, fields){
          if(error){
            message = "UserName and password does not match";
            res.send({
              "code":400,
              "message":message
                });
          }else{
            if(results.length>0){
              var user = {
                "name":results[0].name,
                "email":results[0].email,
                "age":results[0].age,
                "gender":results[0].gender
              };
              var token = jwt.sign(user, 'superSecret');
              res.send({
                "code":200,
                "message":message,
                "name":user.name,
                "token":token
                  });
            }
          }
        });
    }
    else{
      message="UserName does not exits";
      res.send({
        "code":400,
        "message":message
          });
    }
  }
  });
};

exports.survey = function(req,res){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token){
    jwt.verify(token, 'superSecret', function(err, decoded) {
      if (err) {
        message="Failed to authenticate token."
        res.send({
          "code": "200",
          "message": message
        });
      }else{
        console.log(decoded.email);
        var email = decoded.email;
        var survey = req.body.survey;
        connection.query('UPDATE patient SET survey = ? where email = ?',[survey,email], function (error, results, fields){
          if (error) {
            console.log("error ocurred",error.code);
            message = "Invalid data. Try again"
            res.send({
              "code":400,
              "message":message
            })
          }else{
            message = "Survey successfully created";
            res.send({
              "code":200,
              "message":message,
                });
          }
        });
      }
    });
  }else{
    message="Invalid token";
    res.send({
      "code":400,
      "message":message
    });
  }
};
