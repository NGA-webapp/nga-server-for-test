var ReqSimulator = require('../core/ReqSimulator');
var simul = new ReqSimulator();
var getMatch = require('../utils/common').getMatch;


var Forum = function (proxy) {
  this.proxy = proxy;
  this.cookies = '';
  return this;
};
Forum.prototype.setCookies = function (cookies) {
  this.cookies = cookies;
  return this;
};
Forum.prototype.get = function (query) {
  var self = this;
  var fid = query.fid || -7;
  var page = query.page || 1;
  var url = 'http://bbs.ngacn.cc/thread.php?fid=' + fid + '&page=' + page + '&lite=xml&v2';
  simul.url(url).loadCookies(self.cookies).get(function () {
    self.proxy.emit('result', this.getHtml());
  });
};

module.exports = Forum;