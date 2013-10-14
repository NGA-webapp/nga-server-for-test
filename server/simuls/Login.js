var ReqSimulator = require('../core/ReqSimulator');
var config = require('../../config');
var simul = new ReqSimulator();
var getMatch = require('../utils/common').getMatch;


var Login = function (proxy) {
  this.proxy = proxy;
  return this;
};
/**
 * 登录178  
 */
Login.prototype.loginSite = function () {
  var self = this;
  simul.url('https://account.178.com/q_account.php').data(config.loginSite).post(function () {
    if (this.getCookiesString()) {
      console.log(this._url, this.getCookiesString());
      self.proxy.emit('siteCookie', this.getCookiesString());
    } else {
      self.proxy.emit('error', new Error('登录178失败'));
    }
  });
};
/**
 * 登录nga论坛
 */
Login.prototype.loginNga = function () {
  var self = this;
  self.proxy.assign('siteCookie', function (siteCookie) {
    var data = {
      func: 'login',
      uid: getMatch(siteCookie, new RegExp(/_178c=(\d*)%23/), 1),
      cid: getMatch(siteCookie, new RegExp(/_sid=(\w*);/), 1),
      expires: getMatch(siteCookie, new RegExp(/_e=(\d*);/), 1)
    };
    simul.url('http://bbs.ngacn.cc/nuke.php').data(data).post(function () {
      if (this.getCookiesString()) {
        console.log(this._url, this.getCookiesString());
        self.proxy.emit('ngaCookie', this.getCookiesString());
      } else {
        self.proxy.emit('error', new Error('登录Nga失败'));
      }
    });
  });
  self.loginSite();
};

module.exports = Login;