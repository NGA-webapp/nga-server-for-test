define(function (require, exports, module) {
  var toInteger = require('utils/common').toInteger;
  var getNodeText = require('utils/quoUtils').getNodeText;
  var TopicModel = Backbone.Model.extend({
    defaults: {
      // 参考 http://bbs.ngacn.cc/read.php?pid=118598780
      "tid": 0, // 主题id
      "fid": 0, // 所在版面id
      "quoteFrom": 0, // 被引用主题id 如果不是0 实际tid应该是这个
      "quoteTo": "", // 引用这个主题的主题id 无用
      "icon": 0, // 图标
      "titleFont": "", // 颜色和字体
      "authorName": "", // 主题作者名
      "authorId": 0, // 主题作者uid
      "subject": "", // 主题标题
      "type": 0, // 主题状态bit
      "postDate": 0, // 发布时间
      "lastPost": 0, // 最后回复时间
      "lastPoster": "", // 最后回复人的用户名
      "replies": 0, // 回复数量
      "upload": 0, // 是否有附件
      "lastModify": 0, // 最后改动时间 (主题或任何一个回复的 修改 评分 回复等
      "recommend": 0, // 推荐值 加分或加精华或置顶
      "admin": 0, // 用户是否对此主题有权限bit (列表中显示)
      "url": "", // 主题地址 (列表中显示)
    },
    loadXml: function ($item) {
      var nodeText = function (selector) {
        return getNodeText($item, selector);
      };
      var obj = {
        "tid": toInteger(nodeText('tid')),
        "fid": toInteger(nodeText('fid')),
        "quoteFrom": toInteger(nodeText('quote_from')),
        "quoteTo": nodeText('quote_to'),
        "icon": toInteger(nodeText('icon')),
        "titleFont": nodeText('titlefont'),
        "authorName": nodeText('author'),
        "authorId": toInteger(nodeText('authorid')),
        "subject": nodeText('subject'),
        "type": toInteger(nodeText('type')),
        "postDate": toInteger(nodeText('postdate')),
        "lastPost": toInteger(nodeText('lastpost')),
        "lastPoster": nodeText('lastposter'),
        "replies": toInteger(nodeText('replies')),
        "upload": toInteger(nodeText('ifupload')),
        "lastModify": toInteger(nodeText('lastmodify')),
        "recommend": toInteger(nodeText('recommend')),
        "admin": toInteger(nodeText('admin_ui')),
        "url": nodeText('tpcurl'),
      };
      this.set(obj);
      return this;
    }
  });
  module.exports = TopicModel;
});


