var app = require('./app');
var debug = require('debug')('mealworm:server');
var fs = require('fs');
var http = require('http');

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

global.config = require('../server');
global.translator = require('./translator');
global.templates = [];

fs.readdirSync('./views/templates/').forEach((v) => {
	global.templates.push(v.replace(/\.ejs$/, ''));
});

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

var normalizePort = (val) => {
	var port = parseInt(val, 10);

	if(isNaN(port)) return val;
	if(port >= 0) return port;
	return false;
}

var onError = (error) => {
	if(error.syscall !== 'listen') throw error;

	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

	switch(error.code){
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

var onListening = () => {
	var addr = server.address();
	var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	debug('Listening on ' + bind);
}
