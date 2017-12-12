var Slack = require('slack-node');
var apiToken = process.env.SLACK_TOKEN;

Slack = new Slack(apiToken);

module.exports = {
	notifyDisable: function(sup_name, req_slack_name){
		var text;

		if(sup_name === req_slack_name){
			texts = 'Suporter ' + sup_name + ' foi desativado com sucesso por ele mesmo.\nGG Buddy, Good night :sleeping:';
		}
		else{
			texts = 'Suporter ' + sup_name + ' foi desativado com sucesso pelo agente ' + req_slack_name + '!\nGGWP Boys! :rage1:';
		}

		Slack.api('chat.postMessage', {
			channel: '#realsuporte',
			attachments: getMessage(sup_name), 
			text: texts
		}, function(err, response){
			if (err) throw err;

			console.log(response);
		});
	},
	notifyEnable: function(sup_name, req_slack_name){
		var texts;

		if(sup_name === req_slack_name){
			texts = 'Suporter ' + sup_name + ' foi ativado com sucesso por ele mesmo.\nLets go boys, TRABSON! :coffeeparrot:'; 
		}
		else{
			texts = 'Suporter ' + sup_name + ' foi ativado com sucesso pelo agente ' + req_slack_name + '!\nIm back! :dealwithitparrot:';
		}
		
	  Slack.api('chat.postMessage', {
			channel: '#realsuporte',
			attachments: getMessage(sup_name),
			text: texts
		}, function(err, res){
			if (err) throw err;

			console.log(res);
		});		
	},
	getRequesterName: function(req_slack_id, callback){
		console.log(req_slack_id);
		Slack.api('users.info',{
			user: req_slack_id
		}, function(err, res){
			if(err) throw err;

			console.log(res);
			callback(res.user);
		});
	},
	notifyStatus: function(users, req_user){
		var text = generateBody(users, req_user);

		Slack.api('chat.postMessage', {
			channel: '#realsuporte',
			text: text
		}, function(err, res){
			if(err) throw err;

			console.log(res);
		});
	}
};

function getMessage(sup_name){
	var message = JSON.stringify([
		{
			fallback: 'Alerta de suporter',
			color: '#7CD197'
		}
	]);

	return message;
};

function generateBody(users, req_user){
	console.log(req_user);
	var text = '<@'+ req_user  +'> \n*Status dos suporters:* \n';
	users.forEach(function(user){
		text = text + user.name + ': ' + user.status + '\n';
	});
	return text;
}
