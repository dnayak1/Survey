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

exports.patient = function(req,res){

  sess = req.session;
  if(sess.email){
    connection.query('SELECT age,email,name,survey FROM patient', function (error, results, fields) {
    if (error) {
      res.redirect("/error");
    }else{
      if(results.length > 0){
        res.send({
          "patients":results
        })
      }
      else{
        res.redirect("/error");
      }
    }
    });
  }
  else {
    res.redirect("/showSignInPage");
  }

};
exports.register = function(req,res){
  sess = req.session;
  console.log(req);
  if(sess.email){
    var name = req.body.name;
    var email = req.body.email;
    var age = req.body.age;
    var password = req.body.password;
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(age);
    connection.query('INSERT INTO user(email,password) values(?,?)',[email,password], function (error, results, fields){
      if (error) {
        res.redirect("/error");
      }else{
        connection.query('INSERT INTO patient(name,email,age) values(?,?,?)',[name,email,age], function (error, results, fields){
          if (error) {
            res.redirect("/error");
          }else{
            res.redirect("/patients");
          }
        });
      }
    });

  }
  else {
    res.redirect("/showSignInPage");
  }

};
