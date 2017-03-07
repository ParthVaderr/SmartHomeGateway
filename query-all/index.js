var sql = require('mssql');

var config = {
    user: 'sqluser',
    password: 'sqluser1',
    server: 'sqlcapdb.c1mjcerve8jg.us-east-1.rds.amazonaws.com',
    database: 'MasterDB'
}

exports.handler = (event, context, callback) => {
  sql.connect(config).then(function() {
      // Query

      new sql.Request().query('select * from tempTest').then(function(recordset) {
          console.dir(recordset);
      }).catch(function(err) {
          // ... query error checks
          console.log("hi");
      });

      callback(null, "some success message");

      sql.close();


  }).catch(function(err) {
      // ... connect error checks
      console.log("Error connecting");
  });

  }
