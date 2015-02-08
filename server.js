var config = require('./config'),
    moment = require('moment'),
    storage = require('./lib/storage'),
    chokidar = require('chokidar'),
    io = require('socket.io').listen(8080);

// Server Main Code
//
// Watches for file changes 
// from directories defined in the config file
function Server(){
  var _this = this;

  this.watcher = chokidar
  .watch(config.dirs, { 
    ignoreInitial: true, 
    ignored: /[\/\\]\./,
    alwaysStat: true
  });
  
  this.watcher
  .on('add', function(path, stat){ 
    _this.event('add', path, stat);
  })
  .on('change', function(path, stat){
    _this.event('change', path, stat);
  })
  .on('unlink', function(path, stat){
    _this.event('remove', path, stat);
  })
  .on('error', this.error);

  console.log('FSdash server started. Now watching...');
}

Server.socket = false;

// Handles watcher events 
Server.prototype.event = function(event, path, stat){
  storage.add({
    'event': event,
    'path': path,
    'ts': moment().format(),
    'size': (typeof stat !== 'undefined' && stat) ? stat.size : 0
  });

  if(this.socket){
    this.socket.emit('update_log', { message: 'update' });
  }
};

// Handle errors
Server.prototype.error = function(error){
  console.log(error);
};

// start server
var server = new Server();

// start socket.io
io.sockets.on('connection', function (socket) {
  // pass current socket to server socket
  server.socket = socket;
});
