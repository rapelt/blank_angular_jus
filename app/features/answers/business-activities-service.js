angular.module('businessActivities', ['answers'])
  .factory('BusinessActivities', function (AnswersFactory) {
    var businessActivities = AnswersFactory.instance();
    businessActivities.setAnswers({
      cafe: false,
      mobile: false,
      takeaway: false
    });
    return businessActivities;
  });
