define(function (require, exports, module) {
  var toInteger = require('utils/common').toInteger;
  var getNodeText = require('utils/quoUtils').getNodeText;
  var BasicModel = require('modules/models/abstracts/Basic');
  var AccountModel = require('modules/models/data/Account');

  var ReadModel = BasicModel.extend({
    url: 'http://bbs.ngacn.cc/read.php',
    defaults: {
      "account": new AccountModel(),
      "users": {},
      "posts": {},
      "topic": {},
      "rows": 0,
      "thisRows": 0,
      "perRows": 20,
    },
    loadXml: function ($item) {
      var nodeText = function (selector) {
        return getNodeText($item, selector);
      };
      var obj = {
        
      };
      this.set(obj);
      return this;
    },
    parse: function (resp) {
      window.resp = resp;
      var $resp = $$(resp);
      return {
        account: new AccountModel($$(resp).find('__CU'), {parse: true}),
        // users: new UserCollection($$(resp))
      };
    }
  });
  module.exports = ReadModel;
});
