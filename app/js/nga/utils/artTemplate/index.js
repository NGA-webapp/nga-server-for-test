define(function (require, exports, module) {
  var template = require('./source');
  var common = require('../common');
  template.openTag = "<%";
  template.closeTag = "%>";
  template.helper('$format_date', function (content) {
    var timestamp = parseInt(content + '000', 0);
    return common.format_date(new Date(timestamp), true);
  });
  template.helper('$first', function (arr) {
    var res = arr.length ? arr[0] : {};
    return res;
  });
  template.helper('$get', function (obj, key) {
    window.o = obj;
    var res = key in obj ? obj[key] : '';
    return res;
  });
  module.exports = template;
});