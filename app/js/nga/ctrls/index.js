define(function (require) {
  var api = require('../apis/index');
  var EventProxy = require('../utils/EventProxy');

  var ep = new EventProxy();
  ep.all('forums', 'global', function (forums, global) {
    window.forums = forums;
    console.log(forums, global);
  });

  api.site(function (res) {
    console.log(res);
  });

  api.forums(function (res) {
    ep.emit('forums', res);
  });
  api.global(function (res) {
    ep.emit('global', res);
  });

});