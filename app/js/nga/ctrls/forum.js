define(function(require, exports) {
  var common = require('../utils/common');
  var api = require('../apis/index');
  var template = require('../utils/artTemplate/index');
  var topicCtrl = require('./topic');

  // 定义绑定点击事件的方法
  var introForum = function () {
    // Lungo.dom('#groups>article li').off('tap', introForum);
    var fid = $$(this).data('topic');
    Lungo.dom('#topic>header>h1').text(Lungo.dom(this).find('strong').text());
    topicCtrl.request(fid);
  };

  var request = exports.request = function(fid, page) {
    page = page || 1;
    Lungo.Notification.show();
    api.forum(fid, page, function(forum) {
      // console.log('forum', forum);
      // 清楚原来的点击事件绑定
      Lungo.dom('#forum-0 li').off('tap', introForum);
      // 清空原来的列表并渲染模板
      Lungo.dom('#forum-0').html(template.compile(require('../views/forum/article.tpl'))({
        forum: forum
      }));
      // 重新绑定事件
      Lungo.dom('#forum-0 li').on('tap', introForum);
      // 准备完毕，进入页面，并隐去加载提示
      Lungo.Notification.hide();
      Lungo.Router.article('forum', 'forum-0');
    });
  };
});