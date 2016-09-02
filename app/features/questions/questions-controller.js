'use strict';

angular.module('Questions', [])
  .controller('QuestionsController', function ($scope, $state, $rootScope, QuestionsService) {
    //Set business activities all to true if busniessActivities is undefined
    $rootScope.businessActivities = $rootScope.businessActivities ? $rootScope.businessActivities : {
      cafe: true,
      mobileFood: true,
      takeaway: true
    };

    $scope.ablisQuestions = "";
    $scope.page =  0;
    $rootScope.qanswers = $rootScope.qanswers || {};
    $scope.group_id = "groupid1";
    $scope.ablisData = {};
    $scope.updateQanswers = function(evt, questionid) {
      var primequestion = $scope.ablisData[$scope.group_id].questions[questionid];

      //clear subquestions when the prime question's qanswer changes
      if (primequestion.answer) {
        _.each(primequestion.answer.subquestion.answers, function (answer) {
          $rootScope.qanswers[answer.id] = false;
        });
      }
    };

    QuestionsService.getQuestions().then(function(response){
      $scope.ablisData = response;
      $scope.$evalAsync();
      console.log("ablisdata", $scope.ablisData);
    });

    $scope.showNextPage = function () {
      if($scope.page < 1){
        $scope.page =  $scope.page + 1;
      } else {
        $state.go('results');
      }
    };

    $scope.showPreviousPage = function () {
      if($scope.page > 0){
        $scope.page =  $scope.page - 1;
      } else {
        $state.go('business-types');
      }
    }
  });
