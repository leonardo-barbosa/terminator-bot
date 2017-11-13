var mongoose = require('mongoose');
var user = process.env.MONGO_USER;
var pass = process.env.MONGO_PASS;

module.exports = {
	getConnection: function(){
		var uri = ('mongodb://'+ user +':'+ pass +'@ds149124.mlab.com:49124/perry-bot');
		mongoose.Promise = global.Promise;
		mongoose.connect(uri, {
			useMongoClient: true
		});

		var db = mongoose.connection;
	}
};
