var redis = require('redis').createClient();

var Storage = function(){
  this.hash_name = 'log';
  this.list_name = 'logs';
};

Storage.prototype.add = function(item){
  var self = this;
  redis.incr('key');
  redis.get('key', function(err, res){
    redis.hset(self.hash_name+':'+res, 'event', item.event);
    redis.hset(self.hash_name+':'+res, 'path', item.path);
    redis.hset(self.hash_name+':'+res, 'ts', item.ts);
    redis.lpush(self.list_name, res);
  });
};

if(typeof module !== 'undefined' && module.exports){
  module.exports = new Storage();
}
