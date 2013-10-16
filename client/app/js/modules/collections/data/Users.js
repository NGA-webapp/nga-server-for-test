define(function (require, exports, module) {
  var UserModel = require('modules/models/data/User');
  var UserCollection = Backbone.Collection.extend({
    model: UserModel
  });

  module.exports = UserCollection;
});