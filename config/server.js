module.exports = function(){
	var express = require('express');
	var app = express();
	

	var routes = require('../app/routes/web');

	routes(app);

	app.listen(process.env.PORT || 5000, function(){
		console.log("Terminator bot in running on port:%s", process.env.PORT || 5000);
	});

};

