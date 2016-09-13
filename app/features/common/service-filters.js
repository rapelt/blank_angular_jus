'use strict';
angular.module('serviceFilters', ['questionsStorage', 'businessActivities'])
  .factory('ServiceFilters', function (QuestionsStorage, BusinessActivities, LocationStorage) {
    return {
      numberOfFilters: function () {
        return QuestionsStorage.getTrueValueKeys().length + BusinessActivities.getTrueValueKeys().length + LocationStorage.getValues().length;
      },
      filterByBusinessActivities: function (services) {
        var businessActivitiesKeys = BusinessActivities.getTrueValueKeys();
        if (businessActivitiesKeys.length === 0) {
          return services;
        }

        return _.pick(services, function (service) {
          // return true iff there is at least one key common to both arrays
          return _.intersection(service.business_activities, businessActivitiesKeys).length > 0;
        });
      },
      filterByQuestions: function (services) {
        var qkeys = QuestionsStorage.getTrueValueKeys();
        if (qkeys.length === 0) {
          return services;
        }
        function intersectValues (service) {
          var intersection = _.intersection(service.parent_answer_ids, qkeys);
          return intersection.length > 0;
        }
        return _.pick(services, intersectValues);
      },
      filterByLocations: function (services) {
        var qkeys = LocationStorage.getValues();
        if (qkeys.length <= 0) {
          return services;
        }

        var ret = _.pick(services, function (service) {
          if (service.location === 'any') {
            return true;
          } else {
            var matchedLocation = _.find(qkeys, function (key) {
              if (key === service.location) {
                return true;
              }
            });
            if (matchedLocation) {
              return true;
            }
          }
        });
        return ret;
      },
      getThreadlessServices: function (services) {
        var threadLessServices = {};
        Object.keys(services).forEach(function (key) {
          if (services[key].parent_answer_ids.length === 0) {
            threadLessServices[key] = services[key];
          }
        });
        return threadLessServices;
      }
    };
  });
