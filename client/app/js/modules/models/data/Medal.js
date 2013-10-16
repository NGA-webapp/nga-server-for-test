define(function (require, exports, module) {
  var toInteger = require('utils/common').toInteger;
  var getNodeText = require('utils/quoUtils').getNodeText;
  var MedalModel = Backbone.Model.extend({
    defaults: {
      // 参考 http://bbs.ngacn.cc/read.php?pid=118598780
      "mid": 0, // 徽章id 
      "name": "", // 名字 
      "icon": "", // 图标 
      "description": "" // 说明 
    },
    loadXml: function ($item) {
      var nodeText = function (selector) {
        return getNodeText($item, selector);
      };
      var obj = {
        // todo
      };
      this.set(obj);
      return this;
    }
  });
  module.exports = MedalModel;
});
