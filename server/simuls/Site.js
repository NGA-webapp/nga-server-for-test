var BaseSimul = require('./Base');
var _ = require('underscore');

var Site = function () {
  return BaseSimul.apply(this, arguments);
};
var makeUrl = function () {
  return 'http://bbs.ngacn.cc/index.php?lite=xml&v2';
};
Site.prototype = _.extend(Site.prototype, BaseSimul.prototype, {
  makeUrl: makeUrl
});

module.exports = Site;