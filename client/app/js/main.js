define(function (require, exports, module) {
  var Router = require('modules/Router')();
  var router = new Router();
  Backbone.$ = $$;
  Backbone.history.start();


  window.ReadModel = require('modules/models/integration/Read');
  
});
