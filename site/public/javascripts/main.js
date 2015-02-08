(function(Backbone, $, exports){
  /*
   * Logs Collection
   */
  var Logs = Backbone.Collection.extend({
    url: '/logs'
  });
  
  exports.logs = new Logs();

  // custom template interpolation
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };
  
  /*
   * Log Item Row View
   */
  var LogItem = Backbone.View.extend({
    tagName: 'tr',
    initialize: function(params){
      this.model = params.model || {};
    },
    template: _.template($('#logItemTpl').html()),
    render: function(){
      var attr = _.clone(this.model.attributes);

      if(typeof attr.size === 'undefined')
        attr.size = 0;

      attr.ts = moment(attr.ts)
        .format("MMMM Do YYYY, h:mm:ss a");
        
      switch(attr.event){
        case 'add':
          attr.label_title = 'Added';
          attr.class_suffix = '-success';
          break;
        case 'change':
          attr.label_title = 'Changed';
          attr.class_suffix = '-warning';
          break;
        case 'remove':
          attr.label_title = 'Deleted';
          attr.class_suffix = '-danger';
          break;
      }

      this.$el.html(this.template(attr));
      return this;
    }
  });

  /*
   * Log Items View
   */
  var LogItems = Backbone.View.extend({
    el: '.logs-table',
    initialize: function(){ 
      logs.on('sync', this.render, this);
    },
    render: function(e){
      var that = this;
      this.$('tbody').empty();
      logs.forEach(function(item){
        
        var logItem = new LogItem({ model: item });
        that.$('tbody').append(logItem.render().el);
      });
    }
  });

  var App = function(){
    var socket = io(':8080');
    new LogItems();

    socket.on('connect', function () {
      socket.on('update_log', function (msg) {
        logs.fetch({ data: $('#params').serialize() });
        console.log('Log updated');
      });
    });

    logs.fetch({ data: $('#params').serialize() });
  };

  new App();
})(Backbone, Backbone.$, window);
