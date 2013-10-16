define(function (require, exports, module) {
  var PostModel = require('modules/models/data/Post');
  var PostCollection = Backbone.Collection.extend({
    model: PostModel
  });

  module.exports = PostCollection;
});