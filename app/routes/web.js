var bodyParser = require('body-parser');
var users = require('../controllers/users_records.js');

module.exports = function(app){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.post('/manage_suporters',function(req, res){
		try{	
			var command = req.body.command;
			var text = req.body.text;
			var user_id = req.body.user_id;

			if(command === '/enable'){			
				users.enableSuporter(text, user_id, function(result){
					console.log(result);
					res.status(200);
					res.send(result);
				});
			}else if(command === '/disable'){
				users.disableSuporter(text, user_id, function(result){
					console.log(result);
					res.status(200);
					res.send(result);
				});
			}
		}  catch( error ) {
			res.status(error.status || 500);
			res.end();
		}
	});

	app.post('/suporters_status', function(req, res){
		try{
			var user_id = req.body.user_id;

			users.listStatus(user_id, function(result){
				res.status(200);
				res.send(result);
			});	
		} catch( error ){
			res.status(error.status || 500);
			res.send();
		}
	});


}

