'use strict';

angular.module('Questions', ['answers'])
  .controller('QuestionsController', function ($scope, $state, $rootScope, QuestionsService, Answers) {
    // Set business activities all to true if busniessActivities is undefined
    $rootScope.businessActivities = $rootScope.businessActivities ? $rootScope.businessActivities : {
      cafe: true,
      mobile: true,
      takeaway: true
    };

    $scope.ablisQuestions = '';
    $scope.page = 0;
    $scope.groups = [];
    $scope.qanswers = Answers.getAnswers();
    $scope.group_id = 'groupid1';
    $scope.ablisData = {};

    QuestionsService.getQuestions().then(function (response) {
      $scope.ablisData = response;
      $scope.groups = _.keys(response);
      $scope.group_id = $scope.groups[ $scope.page ];
      $scope.$evalAsync();
    });

    $scope.updateQanswers = function (questionid) {
      var primequestion = $scope.ablisData[ $scope.group_id ].questions[ questionid ];

      if (primequestion.answer) {
        _.each(primequestion.answer.subquestion.answers, function (answer) {
          $scope.qanswers[ answer.id ] = false;
        });
      }
    };

    $scope.showNextPage = function () {
      if ($scope.page < $scope.groups.length - 1) {
        $scope.page = $scope.page + 1;
        $scope.group_id = $scope.groups[ $scope.page ];
      } else {
        $state.go('results');
      }
    };

    $scope.showPreviousPage = function () {
      if ($scope.page <= 0) {
        $state.go('business-types');
      } else {
        $scope.page = $scope.page - 1;
        $scope.group_id = $scope.groups[ $scope.page ];
      }
    };
  });
