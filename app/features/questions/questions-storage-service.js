angular.module('questionsStorage', [])
  .factory('QuestionsStorageService', function () {
    return {
      instance: function () {
        var storage = {};
        return {
          getValues: function () {
            return storage;
          },
          setValues: function (values) {
            storage = values;
          },
          setValue: function (value) {
            storage[value.id] = value.value;
          },
          getTrueValueKeys: function () {
            return _.keys(_.pick(storage, function (values) {
              return values;
            }));
          },
          clear: function () {
            storage = {};
          }
        };
      }
    };
  })
  .factory('QuestionsStorage', function (QuestionsStorageService) {
    return QuestionsStorageService.instance();
  });
