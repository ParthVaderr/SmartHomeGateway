// Logout function
// ==============
// Will take the session token provided by the app and set the session token in
// the table to 'null'

"use strict";
var sql = require('mssql');

var config = {
    user:       'sqluser',
    password:   'sqluser1',
    server:     'sqlcapdb.c1mjcerve8jg.us-east-1.rds.amazonaws.com',
    database:   'MasterDB'
};

exports.handler = (event, context, callback) => {

    var sessionToken = event.sessionToken;

    var queryString = "UPDATE UserAccount SET SessionToken = NULL WHERE SessionToken = '"+ sessionToken +"'";
    sql.connect(config).then(function() {
        new sql.Request().query(queryString).then(function(err,recordset) {

            //console.log("The value of sessiontoken is: "+recordset);

            callback(null, "Successfully Logged Out");
        }).catch(function(err) {
            console.log(err);
        });

        sql.close();

  }).catch(function(err) {
      // ... connect error checks
      console.log("Error connecting");
  });

}
