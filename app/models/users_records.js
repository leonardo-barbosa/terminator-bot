var mongoose = require('mongoose');

module.exports = {
	getModel: function(){

		mongoose.model('users_records', {
			name: {type: String, require: true},
				email: {type: String, require: true},
				slack_user: {type: String, require: true, unique: true},
				slack_id: String,
				status: String
			}	
		);
	},
};
