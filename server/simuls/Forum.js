var BaseSimul = require('./Base');
var _ = require('underscore');

var Forum = function () {
  return BaseSimul.apply(this, arguments);
};
var makeUrl = function (query) {
  var fid = query.fid || -7;
  var page = query.page || 1;
  var url = 'http://bbs.ngacn.cc/thread.php?fid=' + fid + '&page=' + page + '&lite=xml&v2';
  return url;
};
Forum.prototype = _.extend(Forum.prototype, BaseSimul.prototype, {
  makeUrl: makeUrl
});

module.exports = Forum;