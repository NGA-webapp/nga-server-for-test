define(function (require, exports, module) {
  var toInteger = require('utils/common').toInteger;
  var getNodeText = require('utils/quoUtils').getNodeText;
  var UserModel = Backbone.Model.extend({
    defaults: {
      // 参考 http://bbs.ngacn.cc/read.php?pid=118598780
      "uid": 0, // uid 
      "username": "", // 用户名 
      "medal": 0, // 徽章id 逗号分隔 
      "group": 0, // 用户组 如果是-1使用下一个用户组 
      "member": 0,// 用户组 
      "avatar": "",// 头像 和以前一样 可能是字符串也可能是object 
      "yz": 0, // 激活状态 1激活 0未激活 -1nuke -2往下账号禁用 
      "site": "", // 个人版名 
      "honor": "", // 头衔 
      "reg": 0, // 注册日期 
      "mute": 0, // 禁言到期时间 
      "post": 0, // 发帖数 
      "rvrc": 0, // 威望 
      "money": 0, // 金钱 铜币数 
      "visit": 0, // 最后一次访问 
      "signature": "", // 签名 
      "bit": 0 // 用户状态bit 
    },
    loadXml: function ($item) {
      var nodeText = function (selector) {
        return getNodeText($item, selector);
      };
      var obj = {
        "uid" : toInteger(nodeText('uid')),
        "username": nodeText('username'),
        "medal": toInteger(nodeText('medal')),
        "group": toInteger(nodeText('groupid')),
        "member": toInteger(nodeText('memberid')),
        "avatar": nodeText('avatar'),
        "yz": toInteger(nodeText('yz')),
        "site": nodeText('site'),
        "honor": nodeText('honor'),
        "reg": toInteger(nodeText('regdate')),
        "mute": toInteger(nodeText('mute_time')),
        "post": toInteger(nodeText('postnum')),
        "rvrc": toInteger(nodeText('rvrc')),
        "money": toInteger(nodeText('money')),
        "visit": toInteger(nodeText('thisvisit')),
        "signature": nodeText('signature'),
        "bit": toInteger(nodeText('bit_data'))
      };
      this.set(obj);
      return this;
    }
  });

  module.exports = UserModel;
});
