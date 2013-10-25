var BaseSimul = require('./Base');
var _ = require('underscore');

var User = function () {
  return BaseSimul.apply(this, arguments);
};
var makeUrl = function (query) {
  var uid = query.uid || 0;
  // if (!uid) {
  //   self.proxy.emit('error', new Error('未指定主题'));
  // }
  var url = 'http://bbs.ngacn.cc/nuke.php?uid=' + uid + '&__lib=ucp&__act=get&lite=xml&v2';
  return url;
};
User.prototype = _.extend(User.prototype, BaseSimul.prototype, {
  makeUrl: makeUrl
});

module.exports = User;