var ReqSimulator = require('../core/ReqSimulator');
var config = require('../../config');
var simul = new ReqSimulator();

var loginUrl = 'http://bbs.ngacn.cc/nuke.php?func=login';
var gsUrl = 'http://bbs.ngacn.cc/nuke.php?func=login&normal_login&gs&raw=2';

var RsaLogin = function (proxy) {
  this.proxy = proxy;
  return this;
};

RsaLogin.prototype.getGs = function () {
  var self = this;
  simul.url(gsUrl).get(function () {
    if (this.getHtml()) {
      console.log(this._url, this.getHtml());
      self.proxy.emit('result', this.getHtml());
    } else {
      self.proxy.emit('error', new Error('获取gs失败'));
    }
  });
};

RsaLogin.prototype.doLogin = function (username, rsaPassword) {
  var self = this;
  var data = {
    'login_type': 'use_name',
    'username': username,
    'password': rsaPassword,
    'expires': 31536000
  };
  simul.url(loginUrl).data(data).post(function () {
    if (this.getCookiesString()) {
      console.log(this._url, this.getCookiesString());
      self.proxy.emit('ngaCookie', this.getCookiesString());
    } else {
      self.proxy.emit('ngaCookie', '');
      self.proxy.emit('error', new Error('登录Nga失败'));
    }
    console.log(this.getHtml());
    self.proxy.emit('result', this.getHtml());
  });
};

module.exports = RsaLogin;