'use strict';

angular.module('QuestionsService', [])
  .factory('QuestionsService', function ($rootScope, $q, $http, QuestionsRepository, ServiceFilters) {
    function getAllAnswersRelatedToServices (serviceFilteredBusinessActivities, answers) {
      var answerKeys = _.uniq(_.flatten(_.pluck(serviceFilteredBusinessActivities, 'parent_answer_ids')));
      return _.pick(answers, answerKeys);
    }

    function getAllQuestionsRelatedToAnswers (answers, questions) {
      var bottomLevelQuestionKeys = _.pluck(answers, 'parent_question_id');
      var bottomLevelQuestions = _.pick(questions, bottomLevelQuestionKeys);
      var primaryQuestionsKeys = _.pluck(bottomLevelQuestions, 'parent_question_id');
      var allQuestionKeys = _.uniq(_.union(bottomLevelQuestionKeys, primaryQuestionsKeys));
      return _.pick(questions, allQuestionKeys);
    }

    function addAnswersToSubquestions (subquestions, answers) {
      return _.mapObject(subquestions, function (subquestion) {
        subquestion.answers = _.pick(answers, function (answer) {
          return answer.parent_question_id === subquestion.id;
        });

        return subquestion;
      });
    }

    function addSubQuestionsToPrimaryQuestions (primaryQuestions, subquestions) {
      return _.mapObject(primaryQuestions, function (question) {
        var mySubquestion = _.filter(subquestions, function (subquestion) {
          return question.id === subquestion.parent_question_id;
        });

        if (mySubquestion.length > 0) {
          question.answer = {};
          question.answer.subquestion = mySubquestion[0];
        }

        return question;
      });
    }

    function constructQuestionsObject (filteredServices, questions, answers) {
      var filteredAnswers = getAllAnswersRelatedToServices(filteredServices, answers);
      var allQuestions = getAllQuestionsRelatedToAnswers(filteredAnswers, questions);
      var primaryQuestions = _.pick(allQuestions, function (value) {
        return !value.parent_question_id;
      });

      var subquestions = _.omit(allQuestions, _.keys(primaryQuestions));
      var subquestionsWithAnswers = addAnswersToSubquestions(subquestions, filteredAnswers);
      var primaryQuestionWithSubquestions = addSubQuestionsToPrimaryQuestions(primaryQuestions, subquestionsWithAnswers);

      var questionsWithGroups = _.groupBy(primaryQuestionWithSubquestions, function (question) {
        return question.group_name;
      });

      var map = _.mapObject(questionsWithGroups, function (group, iteratee) {
        return {'group_name': iteratee, 'questions': _.indexBy(group, 'id')};
      });

      return map;
    }

    return {
      getQuestions: function () {
        var data = [QuestionsRepository.getQuestions(), QuestionsRepository.getAnswers(), QuestionsRepository.getServices()];

        return $q.all(data).then(function (values) {
          var questions = values[0].data;
          var answers = values[1].data;
          var services = values[2].data;

          var serviceFilteredBusinessActivities = ServiceFilters.filterByBusinessActivities(services, $rootScope.businessActivities);


          // TODO filterServicesByLocation

          var constructedQuestionsObject = constructQuestionsObject(serviceFilteredBusinessActivities, questions, answers);

          return constructedQuestionsObject;
        });
      }
    };
  });
