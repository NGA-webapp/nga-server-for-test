var ReqSimulator = require('../core/ReqSimulator');
var config = require('../../config');
var simul = new ReqSimulator();
var RSAKey = require('../utils/rsa/rsa').RSAKey;

var loginUrl = 'http://bbs.ngacn.cc/nuke.php?func=login';
var gsUrl = 'http://bbs.ngacn.cc/nuke.php?func=login&normal_login&gs&raw=2';


var encryptPassword = function (password, gs) {
  var m = 'ac8035fde4630e011ab3f32f85e85c8eddd7bb5519092e6788f0b6f94995ae86df7078315b00aebefdbf9ed60fdfeed5b8ff41f0899a1d9e98d34669ee88b3eb29061f646017d42970dc020eb87fba0a45c798036a4567077d83e6395b1197ccf80bd621a99dca445d90ab57a1e600e10f6427cf405b474a1933eb8dfbf5009e2f2182c9a7d78d83c1157c397c7eed73c298f8004acef65ffdf89adcc7f5415ce3c755c8ae1e17281b0bcdbfb9ed96ea947e7d25aa2d2e38be10606ed63548e928867eeb797a7c33cded8d5d0319b92a195ef3295262316f6a7114567e794ff06475f24c32442bf022e9d19cea2dd72518e4ff7a571cde7c37fe8bacda00b899';
  var e = '10001';
  var rsa = new RSAKey();
  rsa.setPublic(m, e);
  return '\t' + rsa.encrypt(password + '\t' + gs);
};

var RsaLogin = function (proxy) {
  this.proxy = proxy;
  return this;
};

RsaLogin.prototype.getGs = function () {
  var self = this;
  simul.url(gsUrl).get(function () {
    if (this.getHtml()) {
      console.log(this._url, this.getHtml());
      self.proxy.emit('gs', this.getHtml());
    } else {
      self.proxy.emit('error', new Error('获取gs失败'));
    }
  });
};

RsaLogin.prototype.doLogin = function (username, password) {
  var self = this;
  self.proxy.assign('gs', function (gs) {
    var data = {
      'login_type': 'use_name',
      'username': username,
      'password': encryptPassword(password, gs),
      'expires': 31536000
    };
    console.log(data);
    simul.url(loginUrl).data(data).post(function () {
      console.log(this.getHtml());
      if (this.getCookiesString()) {
        console.log(this._url, this.getCookiesString());
        self.proxy.emit('ngaCookie', this.getCookiesString());
      } else {
        self.proxy.emit('error', new Error('登录Nga失败'));
      }
    });
  });
  self.getGs();
};

module.exports = RsaLogin;