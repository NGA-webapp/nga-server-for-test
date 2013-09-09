define(function (require) {
  var api = require('./apis/index');
  Lungo.init({
    name: 'Ngacn',
    resources: ['aside.html', 'login.html']
  });

  Lungo.Service.Settings.error = function(type, xhr){
      Lungo.Notification.hide();
      _.delay(function () {
        Lungo.Notification.error(
          '服务器连接失败.',
          '请检查网络',
          'cancel',
          7
          );
      }, 400);
      Lungo.Core.log(1, 'service error');
  };
  Lungo.Service.Settings.timeout = 10000;
  Lungo.Service.Settings.crossDomain = true;

  // Lungo.Router.section('login');

  // $$('#main').html(_.template(require('./views/forums.tpl'))());
  $$('#btn-features').on('tap', function () {
    Lungo.Aside.toggle('features');
  });

  Lungo.init({
    name: 'Ngacn',
    resources: ['aside.html', 'login.html']
    
  });
  require('./ctrls/index');

});
