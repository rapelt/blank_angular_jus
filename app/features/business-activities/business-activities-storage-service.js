angular.module('businessActivitiesStorage', [])
  .factory('BusinessActivitiesStorageService', function () {
    return {
      instance: function () {
        var storage = {
          cafe: false,
          mobile: false,
          takeaway: false
        };
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
          },
          isModified: function () {
            return this.getTrueValueKeys().length > 0;
          }
        };
      }
    };
  })
  .factory('BusinessActivities', function (BusinessActivitiesStorageService) {
    return BusinessActivitiesStorageService.instance();
  });
