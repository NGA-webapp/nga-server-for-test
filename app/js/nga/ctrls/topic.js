define(function(require, exports) {
  var common = require('../utils/common');
  var api = require('../apis/index');
  var template = require('../utils/artTemplate/index');

  // 定义绑定点击事件的方法
  var introForum = function () {
    // Lungo.dom('#groups>article li').off('tap', introForum);
    // var fid = $$(this).data('topic');
    // Lungo.dom('#topic>header>h1').text(Lungo.dom(this).find('strong').text());
    // topicCtrl.request(fid);
    // console.log(this);
  };

  var userInfo = function (topic) {
    var root = topic.children[0];
    var users = root.getElementsByTagName('__U')[0].getElementsByTagName('item');
    var obj = {};
    for (i = 0, iLen = users.length; i < iLen; i++) {
      tmp = users[i].children;
      uidElements = users[i].getElementsByTagName('uid');
      if (tmp.length > 0 && uidElements.length > 0) {
        key = uidElements[0].textContent;
        obj[key] = {};
        for (j = 0, jLen = tmp.length; j < jLen; j++) {
          obj[key][tmp[j].tagName] = tmp[j].textContent;
        }
      }
    }
    return obj;
  };

  var request = exports.request = function(fid, page) {
    page = page || 1;
    Lungo.Notification.show();
    api.topic(fid, page, function(topic) {
      window.t = topic;
      console.log(userInfo(topic));
      // 清楚原来的点击事件绑定
      Lungo.dom('#topic-0 li').off('tap', introForum);
      // 清空原来的列表并渲染模板
      Lungo.dom('#topic-0').html(template.compile(require('../views/topic/article.tpl'))({
        topic: topic, userInfo: userInfo(topic)
      }));
      // 重新绑定事件
      Lungo.dom('#topic-0 li').on('tap', introForum);
      // 准备完毕，进入页面，并隐去加载提示
      Lungo.Notification.hide();
      Lungo.Router.article('topic', 'topic-0');
    });
  };
});