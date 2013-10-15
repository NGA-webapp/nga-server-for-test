define(function (require) {
  var api = require('../apis/index');
  var EventProxy = require('../utils/EventProxy');
  var template = require('../utils/artTemplate/index');
  var forumCtrl = require('./forum');
  var articleTpl = require('../views/groups/article.tpl');

  var ep = new EventProxy();

  // 定义绑定点击事件的方法
  var introForum = function () {
    // Lungo.dom('#groups>article li').off('tap', introForum);
    var fid = $$(this).data('forum');
    Lungo.dom('#forum>header>h1').text(Lungo.dom(this).find('strong').text());
    forumCtrl.request(fid);
  };

  Lungo.Notification.show();
  ep.all('groups', 'icons', function (groups, icons) {
    // 清楚原来的点击事件绑定
    Lungo.dom('#groups>article li').off('tap', introForum);
    // 清空原来的列表
    Lungo.dom('#groups>article').remove();
    // 渲染模板
    alert(groups[0].children);
    Lungo.dom('#groups').append(template.compile(articleTpl)({groups: groups, icons: icons}));
    alert(1);
    Lungo.dom('#groups>nav').html(template.compile(require('../views/groups/nav.tpl'))({groups: groups, icons: icons}));
    // 重新绑定事件
    Lungo.dom('#groups>article li').on('tap', introForum);
    // 准备完毕，进入页面，并隐去加载提示
    Lungo.Notification.hide();
    Lungo.Router.article('groups', 'group-0');
  });

  api.groups(function (res) {
    var groups = res.getElementsByTagName('group');
    var i, len;
    for (i = 0, len = groups.length; i < len; i++) {
      if (!groups[i].getAttribute('name')) {
        groups[i].setAttribute('name', groups[i].parentElement.getAttribute('name'));
      }
    }
    ep.emit('groups', groups);
  });
  api.global(function (res) {
    var $res = $$(res);
    window.r = $res;
    var resIcons = $res.find('__FORUM_ICON forum');
    var icons = {};
    var i, len, tmp;
    icons.path = res.getElementsByTagName('__FORUM_ICON_PATH')[0].textContent;
    icons.map = {};
    for (i = 0, len = resIcons.length; i < len; i++) {
      tmp = resIcons[i];
      icons.map[tmp.getAttribute('fid')] = tmp.getAttribute('icon');
    }
    ep.emit('icons', icons);
  });

});