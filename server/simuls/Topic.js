var BaseSimul = require('./Base');
var _ = require('underscore');

var Topic = function () {
  return BaseSimul.apply(this, arguments);
};
var makeUrl = function (query) {
  var tid = query.tid || 0;
  var page = query.page || 1;
  // if (!tid) {
  //   self.proxy.emit('error', new Error('未指定主题'));
  // }
  var url = 'http://bbs.ngacn.cc/read.php?tid=' + tid + '&page=' + page + '&lite=xml&v2';
  return url;
};
Topic.prototype = _.extend(Topic.prototype, BaseSimul.prototype, {
  makeUrl: makeUrl
});

module.exports = Topic;