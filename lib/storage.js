var redis = require('redis').createClient();
var config = require('../config');

var Storage = function(){
  this.hash_name = 'log';
  this.list_name = 'logs';
  this.key_name = 'key';
  this.limit = config.rows;
};

Storage.prototype.add = function(item, callback){
  var self = this;

  redis.incr(this.key_name, function(err, res){
    if(err) throw(err);
    var _hashkey = self.hash_name+':'+res;
    redis.hset(_hashkey, 'event', item.event);
    redis.hset(_hashkey, 'path', item.path);
    redis.hset(_hashkey, 'ts', item.ts);
    redis.hset(_hashkey, 'size', item.size);
    redis.lpush(self.list_name, res);

    if(typeof callback === 'function'){
      callback(err, res);
    }
  });
};

Storage.prototype.del = function(index, callback){
  redis.lrem(this.list_name, 1, index, function(err, res){
    if(err) throw(err);
    if(typeof callback === 'function'){
      callback(err, true);
    }
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
  
  redis.lrange(this.list_name, 0, this.limit, function(err, res){
    if(err) throw(err);
    self._getAllHash(res, callback);
  });
};

if(typeof module !== 'undefined' && module.exports){
  module.exports = new Storage();
}
