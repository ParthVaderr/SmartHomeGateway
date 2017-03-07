// Login function
// ==============
// Will check to see if the username and password provided match in the database
// If yes, then return the session token
// If no, then return an error message

"use strict";
var sql = require('mssql');

var config = {
    user:       'sqluser',
    password:   'sqluser1',
    server:     'sqlcapdb.c1mjcerve8jg.us-east-1.rds.amazonaws.com',
    database:   'MasterDB'
};

    var queryString = "UPDATE UserAccount SET SessionToken = NEWID() OUTPUT INSERTED.SessionToken WHERE UserName = 'AnotherUser' AND UserPassword = 'lmno-pqrs-tuvw'";
    sql.connect(config).then(function() {
        new sql.Request().query(queryString).then(function(recordset) {

            // Check to see if the username and password match
            if(typeof recordset[0] !== "undefined"){
              console.log("Username and password match!");
              console.log(recordset[0].SessionToken);
            }else{
              console.log("Username and password do NOT match");
            }
            //callback(null, recordset);
        }).catch(function(err) {
            console.log(err);
        });

        sql.close();

  }).catch(function(err) {
      // ... connect error checks
      console.log("Error connecting");
  });
