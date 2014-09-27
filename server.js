var config = require('./config'),
    redis = require('redis').createClient(),
    moment = require('moment'),
    chokidar = require('chokidar');

// Server Main Code
//
// Watches for file changes 
// from directories defined in the config file
function Server(){
  var _this = this;

  this.watcher = chokidar
  .watch(config.dirs, { 
    ignoreInitial: true, 
    ignored: /[\/\\]\./ 
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
}

// Handles watcher events 
Server.prototype.event = function(event, path, stat){
  redis.incr('key');
  redis.get('key', function(err, res){
    redis.hset('log:'+res, 'event', event);
    redis.hset('log:'+res, 'path', path);
    redis.hset('log:'+res, 'ts', moment().format());
    redis.lpush('logs', res);

    console.log(res, event, path);
  });
};

// Handle errors
Server.prototype.error = function(error){
  console.log(error);
};

new Server();
