define(function (require, exports, module) {
  var template = require('./source');
  template.openTag = "{{";
  template.closeTag = "}}";
  module.exports = template;
});