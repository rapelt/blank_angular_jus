angular.module('answers', [])
  .factory('Answers', function () {
    var answers = {};
    return {
      getAnswers: function () {
        return answers;
      },
      setAnswer: function (answer) {
        answers[answer.id] = answer.answer;
      },
      getTrueAnswerKeys: function () {
        return _.keys(_.pick(answers, function (ans) {
          return ans;
        }));
      },
      isAnyQuestionAnswered: function () {
        return this.getTrueAnswerKeys().length > 0;
      }
    };
  });
