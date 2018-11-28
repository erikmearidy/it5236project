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
		}else{
			console.log("Connected!");
			var sql = "SELECT userid FROM emailvalidation WHERE emailvalidationid = ?";
			
			conn.query(sql, [event.emailvalidationid], function (err, result) {
				if (err) {
				// This should be a "Internal Server Error" error
				callback(formatErrorResponse('INTERNAL_SERVER_ERROR', [err]));
				}else {
					// Pull out just the userid from the "result" array (index '1')
					var userIDs = [];
					for(var i=0; i<result.length; i++) {
						userIDs.push(result[i]['userid']);
					}
					var sql = "DELETE FROM emailvalidation WHERE emailvalidationid = ?";
					conn.query(sql, [event.emailvalidationid], function (err, result) {
						if (err) {
							// This should be a "Internal Server Error" error
							callback(formatErrorResponse('INTERNAL_SERVER_ERROR', [err]));
						}else if (result.length == 1){
				      		var sql = "UPDATE users SET emailvalidated = 1 WHERE userid = ?";
			
							conn.query(sql, [event.userid], function (err, result) {
								if (err) {
									// This should be a "Internal Server Error" error
									callback(formatErrorResponse('INTERNAL_SERVER_ERROR', [err]));
								}else {
						        	console.log("successful update");
					      			callback(null,"process email validation successful");
					      			
				      			}
							});
							
							
			      		} // user error
						
					});
				}
			});
		}
	});
};