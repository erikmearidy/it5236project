var mysql = require('./node_modules/mysql');
var config = require('./config.json');
var validator = require('./validation.js');

//errors
function formatErrorResponse(code, errs) {
	return JSON.stringify({
		error  : code,
		errors : errs
	});
}

exports.handler = (event, context, callback) => {
	//instruct the function to return as soon as the callback is invoked
	context.callbackWaitsForEmptyEventLoop = false;

	//Gets DB credentials
	var conn = mysql.createConnection({
		host 	: config.dbhost,
		user 	: config.dbuser,
		password : config.dbpassword,
		database : config.dbname
	});

	//prevent timeout from waiting event loop
	context.callbackWaitsForEmptyEventLoop = false;

	//attempts to connect to the database
	conn.connect(function(err) {
		if (err)  {
			// This should be a "Internal Server Error" error
			callback(formatErrorResponse('INTERNAL_SERVER_ERROR', [err]));
		};

		console.log("Connected!");
		var sql = "INSERT INTO passwordreset (passwordresetid, userid, email, expires) VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR))";
		conn.query(sql, [event.passwordresetid, event.userid, event.email, event.expires], function (err, result) {
			if (err) {
				callback(formatErrorResponse('INTERNAL_SERVER_ERROR', [err]));
			} else {
				console.log("successful reset");
				callback(null,"Password Reset");
			}
		});//end of conn.query
	});//end of conn.connect
}//end of exports.handler