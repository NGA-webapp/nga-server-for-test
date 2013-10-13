var iconv = require('iconv-lite');
exports.encodeURI = function (text) {
  var buf = iconv.encode(text, 'gbk');
  var hex = buf.toString('hex');
  var str = '';
  for (var i = 0, len = hex.length; i < len; i = i + 2) {
    str += '%' + hex.substr(i, 2);
  }
  return str;

};