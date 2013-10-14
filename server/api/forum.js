var EventProxy = require('eventproxy');
var ForumSimul = require('../simuls/Forum');

module.exports = function (req, res, next) {
  // res.end(fid + ' ' + page);
  var proxy = new EventProxy();
  proxy.assign('result', function (result) {
    // 因ReqSimulator已经将文件输出为utf8，所以需要把xml的头改为utf8
    result = result.replace(/GBK/i, 'UTF-8');
    res.end(result);
  });
  var forumSimul = new ForumSimul(proxy);
  forumSimul.setCookies(req.cookies.ngaCookie);
  forumSimul.get(req.query);

};