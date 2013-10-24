var EventProxy = require('eventproxy');
var LoginSimul = require('../simuls/RsaLogin');
var config = require('../../config');

module.exports = function (req, res, next) {
  var proxy = new EventProxy();
  var login = new LoginSimul(proxy);
  proxy.assign('ngaCookie', function (ngaCookie) {
    res.cookie('ngaCookie', ngaCookie);
    res.end(ngaCookie);
  });
  login.doLogin(config.login.username, config.login.password);
};