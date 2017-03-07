"use strict";
var sql = require('mssql');

var config = {
    user:       'sqluser',
    password:   'sqluser1',
    server:     'sqlcapdb.c1mjcerve8jg.us-east-1.rds.amazonaws.com',
    database:   'MasterDB'
};

exports.handler = (event, context, callback) => {
    let username = event.username;
    var usernameAvailability = 1;
    sql.connect(config).then(function() {

        new sql.Request().query("select UserID FROM UserAccount WHERE UserName = '" + username + "'").then(function(recordset) {
            //console.log(recordset);
            if (recordset.length > 0) {
                usernameAvailability = 0;
                console.log("Username already exists" + usernameAvailability);
            }else{
                usernameAvailability = 1;
                console.log("Username is available" + usernameAvailability);
            }
            callback(null, usernameAvailability);
        }).catch(function(err) {
            console.log(err);
        });

        sql.close();

  }).catch(function(err) {
      // ... connect error checks
      console.log("Error connecting");
  });

}
