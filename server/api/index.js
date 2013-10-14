var EventProxy = require('eventproxy');
var ForumSimul = require('../simuls/Forum');
var GlobalSimul = require('../simuls/Global');
var GroupSimul = require('../simuls/Group');
var SiteSimul = require('../simuls/Site');
var TopicSimul = require('../simuls/Topic');
var loginApi = require('./login');


var base = function (Simul) {
  return function (req, res, next) {
    var proxy = new EventProxy();
    proxy.assign('result', function (result) {
      result = result.replace(/GBK/i, 'UTF-8');
      res.end(result);
    });
    var simul = new Simul(proxy);
    simul.setCookies(req.cookies.ngaCookie);
    simul.get(req.query);
  };
};

exports.forum = base(ForumSimul);
exports.global = base(GlobalSimul);
exports.group = base(GroupSimul);
exports.site = base(SiteSimul);
exports.topic = base(TopicSimul);
exports.login = loginApi;