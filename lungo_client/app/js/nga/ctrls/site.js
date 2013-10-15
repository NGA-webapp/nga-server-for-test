define(function (require) {
  var api = require('../apis/index');
  api.site(function (res) {
    console.log(res);
    require('./groups');
  });

});