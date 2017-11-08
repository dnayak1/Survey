var dbconnection = require('../dbconnection');
var connection = dbconnection.connection;
var sess ;
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

exports.login = function(req,res){
  var email= req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM user where email=? && password = ? && role = "admin"',[email,password], function (error, results, fields) {
  if (error) {
    res.redirect("/error");
  }else{
    if(results.length > 0){
      sess = req.session;
      sess.email = email;
      res.redirect("/patients");
    }
    else{
      res.redirect("/error");
    }
  }
  });
};
