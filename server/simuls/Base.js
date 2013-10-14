var ReqSimulator = require('../core/ReqSimulator');
var simul = new ReqSimulator();
var getMatch = require('../utils/common').getMatch;


var Base = function (proxy) {
  this.proxy = proxy;
  this.cookies = '';
  return this;
};
Base.prototype.setCookies = function (cookies) {
  this.cookies = cookies;
  return this;
};
Base.prototype.makeUrl = function (query) {
  return '';
};
Base.prototype.get = function (query) {
  var self = this;
  // var fid = query.fid || -7;
  // var page = query.page || 1;
  // var url = 'http://bbs.ngacn.cc/thread.php?fid=' + fid + '&page=' + page + '&lite=xml&v2';
  var url = self.makeUrl(query);
  simul.url(url).loadCookies(self.cookies).get(function () {
    self.proxy.emit('result', this.getHtml());
  });
};

module.exports = Base;