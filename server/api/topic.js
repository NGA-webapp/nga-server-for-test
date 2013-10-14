var EventProxy = require('eventproxy');
var TopicSimul = require('../simuls/Topic');

module.exports = function (req, res, next) {
  // res.end(fid + ' ' + page);
  var proxy = new EventProxy();
  proxy.assign('result', function (result) {
    // 因ReqSimulator已经将文件输出为utf8，所以需要把xml的头改为utf8
    result = result.replace(/GBK/i, 'UTF-8');
    res.end(result);
  });
  var topicSimul = new TopicSimul(proxy);
  topicSimul.setCookies(req.cookies.ngaCookie);
  topicSimul.get(req.query);

};