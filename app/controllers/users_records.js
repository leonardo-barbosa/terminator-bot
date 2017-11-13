var mongoose = require('mongoose');
var model = require('../models/users_records');
var slack_connection = require('../../config/slack');

model.getModel();

module.exports = {
	enableSuporter: function(sup_slack_user, req_slack_id, callback){
		var result;

		mongoose.model('users_records').findOne({slack_user: sup_slack_user}, function(err, user_out){
			if (err) throw err;

			if(user_out){
				user_out.status = 'active';
				
				user_out.save(function(err){
					if (err) throw err;
				});

				console.log('Supporter: %s \nAtivado com sucesso!', user_out.name); 
				slack_connection.getRequesterName(req_slack_id, function(user){
					console.log('Ativado por: %s',user);
					slack_connection.notifyEnable(user_out.name, user.profile.real_name_normalized);
					callback(result = 'Ação realizada com sucesso.');
				});
			}else{
				callback(result = 'Agente não encontrado, habilite alguém válido. :neutral_face:');
			}
		});
	},
	disableSuporter: function(sup_slack_user, req_slack_id, callback){
		var result;

		mongoose.model('users_records').findOne({slack_user: sup_slack_user}, function(err, user_out){
			if (err) throw err;

			if(user_out){
				user_out.status = 'deactive';

				user_out.save(function(err){
					if (err) throw err;
				});

				console.log('Supporter: %s \nDesativado com sucesso!', user_out.name);
				slack_connection.getRequesterName(req_slack_id, function(user){
					console.log('Desativado por: %s', user);
					slack_connection.notifyDisable(user_out.name, user.profile.real_name_normalized);
					callback(result = 'Ação realizada com sucesso.');
				});
			}else{
				callback(result = 'Agente não encontrado, desabilite alguém válido. :neutral_face:');		
			}
		});
	},
	listStatus: function(req_slack_id, callback){
		var result;

		mongoose.model('users_records').find(function(err, users){
			if (err){
				throw err;
				result = err;
				callback(err);	
			} else{
				slack_connection.getRequesterName(req_slack_id, function(req_user){
					slack_connection.notifyStatus(users, req_user.id);	
					callback(null);		
				});
			}
		});
	}
};
