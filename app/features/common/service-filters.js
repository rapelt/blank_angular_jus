'use strict';

angular.module('ServiceFilters', ['answers'])
  .factory('ServiceFilters', function (Answers) {
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
      },
      filterByQuestions: function (services) {
        var qkeys = Answers.getTrueAnswerKeys();
        if (qkeys.length == 0) {
          return services;
        }

        var ret = _.pick(services, function (service) {
          var intersection = _.intersection(service.parent_answer_ids, qkeys);
          return intersection.length > 0;
        });
        return ret;
      }
    };
  });
