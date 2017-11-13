var app = require('./config/server');
var db = require('./config/db');

db.getConnection();
app();

