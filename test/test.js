var assert = require('assert');
var config = require('../config.js');
var storage = require('../lib/storage.js');

describe('Config', function(){
  describe('#dirs', function(){
    it('dir should be an array', function(){
      assert.equal(Array.isArray(config.dirs), true);
    });

    it('dir item should be string', function(){
      assert.equal(typeof config.dirs[0] === 'string', true);
    });
  });
});

describe('Storage', function(){
  it('should expose public methods', function(){
    assert.equal(typeof storage.add, 'function');
  });

  describe('#getAll', function(){
    it('should not return an error', function(done){
      storage.getAll({}, function(){
        done();
      });
    });
  });

  describe('#add', function(){
    var _last_index;
    after(function(){
      storage.del(_last_index);
    });
    it('should not return an error', function(done){
      storage.add({
        event: 'add',
        path: '/',
        ts: '2014-01-01 01:01:01',
        size: '100'
      }, function(err, index){
        _last_index = index;
        done();
      });
    });
  });
});
