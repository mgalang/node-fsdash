var redis = require('redis').createClient();

var Storage = function(){
  this.hash_name = 'log';
  this.list_name = 'logs';
  this.key_name = 'key';
};

Storage.prototype.add = function(item){
  var self = this;

  redis.incr(this.key_name, function(err, res){
    if(err) throw(err);
    redis.hset(self.hash_name+':'+res, 'event', item.event);
    redis.hset(self.hash_name+':'+res, 'path', item.path);
    redis.hset(self.hash_name+':'+res, 'ts', item.ts);
    redis.lpush(self.list_name, res);
  });
};

Storage.prototype._getAllHash = function(keys, callback){
  var self = this,
      multi = redis.multi();

  keys.forEach(function(key, index){
    multi.hgetall(self.hash_name+':'+key);
  });

  multi.exec(function(err, replies){
    if(err) throw(err);
    callback(replies);  
  });
};

Storage.prototype.getAll = function(callback){
  var self = this;

  redis.lrange(this.list_name, 0, 20, function(err, res){
    if(err) throw(err);
    self._getAllHash(res, callback);
  });
};

if(typeof module !== 'undefined' && module.exports){
  module.exports = new Storage();
}
