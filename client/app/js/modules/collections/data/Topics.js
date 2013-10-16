define(function (require, exports, module) {
  var TopicModel = require('modules/models/data/Topic');
  var TopicCollection = Backbone.Collection.extend({
    model: TopicModel
  });

  module.exports = TopicCollection;
});