define(function (require, exports, module) {
  var toInteger = require('utils/common').toInteger;
  var getNodeText = require('utils/quoUtils').getNodeText;
  var PostModel = Backbone.Model.extend({
    defaults: {
      // 参考 http://bbs.ngacn.cc/read.php?pid=118598780
      "content": "", // 帖子内容
      "alterInfo": "", // 修改/加分信息
      "typeBit": 0, // 帖子状态bit
      "authorId": 0, // 发帖人uid
      "subject": "", // 帖子标题
      "pid": 0, // 回复id 主贴本身为0
      "tid": 0, // 主题id
      "fid": 0, // 所在版面id
      "contentLength": 0, // 内容长度
      "orgFid": 0, // 发帖时所在版面id
      "attachs": {}, // 附件
      "lou": 0, // 楼层
      "postDate": 0 // 发帖时间
    },
    loadXml: function ($item) {
      var nodeText = function (selector) {
        return getNodeText($item, selector);
      };
      var obj = {
        "content": nodeText('content'),
        "alterInfo": nodeText('alterinfo'),
        "typeBit": toInteger(nodeText('type')),
        "authorId": toInteger(nodeText('authorid')),
        "subject": nodeText('subject'),
        "pid": toInteger(nodeText('pid')),
        "tid": toInteger(nodeText('tid')),
        "fid": toInteger(nodeText('fid')),
        "contentLength": toInteger(nodeText('content_length')),
        "orgFid": toInteger(nodeText('org_fid')),
        // todo: load attachs
        "attachs": {},
        "lou": toInteger(nodeText('lou')),
        "postDate": toInteger(nodeText('postdatetimestamp'))
      };
      this.set(obj);
      return this;
    }
  });
  module.exports = PostModel;
         

});
