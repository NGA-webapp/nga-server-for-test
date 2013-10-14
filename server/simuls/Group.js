var BaseSimul = require('./Base');
var _ = require('underscore');

var Group = function () {
  return BaseSimul.apply(this, arguments);
};
var makeUrl = function () {
  return 'http://bbs.ngacn.cc/template/js/nga_index_forums.xml';
};
Group.prototype = _.extend(Group.prototype, BaseSimul.prototype, {
  makeUrl: makeUrl
});

module.exports = Group;