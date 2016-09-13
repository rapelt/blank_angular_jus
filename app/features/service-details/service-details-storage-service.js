angular.module('serviceDetails')
  .factory('ServiceDetailsStorageService', function () {
    return {
      instance: function () {
        var storage = [];
        return {
          getValues: function () {
            return storage;
          },
          setValues: function (values) {
            storage = values;
          },
          clear: function () {
            storage = [];
          }
        };
      }
    };
  })
  .factory('ServiceDetailsStorage', function (ServiceDetailsStorageService) {
    return ServiceDetailsStorageService.instance();
  });
