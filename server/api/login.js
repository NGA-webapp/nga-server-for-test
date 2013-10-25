var EventProxy = require('eventproxy');
var LoginSimul = require('../simuls/RsaLogin');

exports.doLogin = function (req, res, next) {
  var proxy = new EventProxy();
  var login = new LoginSimul(proxy);
  proxy.assign('ngaCookie', 'result', function (ngaCookie, result) {
    res.cookie('ngaCookie', ngaCookie);
    res.end(result);
  });
  login.doLogin(req.body.username, req.body.password);
};

exports.getGs = function (req, res, next) {
  var proxy = new EventProxy();
  var login = new LoginSimul(proxy);
  proxy.assign('result', function (result) {
    res.end(result);
  });
  login.getGs();
};