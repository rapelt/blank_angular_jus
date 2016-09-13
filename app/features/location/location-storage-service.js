angular.module('locationStorage', [])
  .factory('LocationStorageService', function () {
    return {
      instance: function () {
        var storage = [];
        var searchValue = '';
        return {
          getValues: function () {
            return storage;
          },
          setValues: function (values) {
            storage = values;
          },
          getSearchValue: function () {
            return searchValue;
          },
          setSearchValue: function (values) {
            searchValue = values;
          },
          clear: function () {
            storage = [];
          }
        };
      }
    };
  })
  .factory('LocationStorage', function (LocationStorageService) {
    return LocationStorageService.instance();
  });
