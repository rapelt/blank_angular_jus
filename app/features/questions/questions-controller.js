'use strict';
angular.module('questions', ['data', 'businessActivities', 'questionsStorage'])
  .controller('QuestionsController', function ($scope, $state, $rootScope, QuestionsService, QuestionsStorage, DataRepository, BusinessActivities) {
    if (!BusinessActivities.isModified()) {
      BusinessActivities.setValues({
        cafe: true,
        mobile: true,
        takeaway: true
      });
    }

    var answersFromService = {};

    $scope.ablisQuestions = '';
    $scope.page = 0;
    $scope.groups = [];
    $scope.qanswers = QuestionsStorage.getValues();
    $scope.group_id = 'groupid1';
    $scope.ablisData = {};

    QuestionsService.getQuestions().then(function (response) {
      $scope.ablisData = response;
      $scope.groups = _.keys(response);
      $scope.group_id = $scope.groups[ $scope.page ];
      $scope.$evalAsync();
    });

    DataRepository.getAnswers().then(function (answers) {
      answersFromService = answers;
      $scope.$evalAsync();
    });

    $scope.updateQanswers = function (questionid) {
      var answerId = getAnswerId(questionid);
      var primequestion = $scope.ablisData[ $scope.group_id ].questions[ questionid ];
      $scope.qanswers[answerId] = $scope.qanswers[questionid];
      if (primequestion.answer) {
        _.each(primequestion.answer.subquestion.answers, function (answer) {
          $scope.qanswers[ answer.id ] = false;
        });
      }
    };

    var getAnswerId = function (questionId) {
      var answerId;
      Object.keys(answersFromService).forEach(function (key) {
        if (answersFromService[key].parent_question_id === questionId) {
          answerId = key;
        }
      });
      return answerId;
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
        $state.go('location');
      } else {
        $scope.page = $scope.page - 1;
        $scope.group_id = $scope.groups[ $scope.page ];
      }
    };
  });
