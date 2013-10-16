define(function (require, exports, module) {
  module.exports = function () {
    var routesTable = {
      "": "index",
      "!/forum/:fid": "getForum",
      "*other": "defaultRoute"
    };
    var Router = Backbone.Router.extend({
      routes: routesTable,
      index: function () {
        console.log('index');
      },
      getForum: function (fid) {
        console.log('forum: ' + fid);
      },
      defaultRoute: function () {
        console.log('404');
      }
    });
    return Router;
  };
});
