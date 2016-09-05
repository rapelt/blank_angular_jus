'use strict';

angular.module('ServiceFilters', [])
  .factory('ServiceFilters', function () {
    return {
      filterByBusinessActivities: function (services, businessActivities) {
        // get all the keys that are true
        var businessActivitiesKeys = _.keys(_.pick(businessActivities, function (value) {
          return value;
        }));

        return _.pick(services, function (service) {
          // return true iff there is at least one key common to both arrays
          return _.intersection(service.business_activities, businessActivitiesKeys).length > 0;
        });
      }
    };
  });
