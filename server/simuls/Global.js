var BaseSimul = require('./Base');
var _ = require('underscore');

var GlobalSimul = function () {
  return BaseSimul.apply(this, arguments);
};
var makeUrl = function () {
  return 'http://bbs.ngacn.cc/template/js/nga_global.xml';
};
GlobalSimul.prototype = _.extend(GlobalSimul.prototype, BaseSimul.prototype, {
  makeUrl: makeUrl
});

module.exports = GlobalSimul;