var path = require('path');
var express = require('express');
var routes = require('./routes');
var config = require('../config');

var app = express();
app.use(express.logger());
app.use(express.compress());
app.use(express.query());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use('/client', express.static(path.join(__dirname, '../', config.client.path)));
routes(app);

app.listen(8001);
