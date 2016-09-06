angular.module('answers', [])
  .factory('AnswersFactory', function () {
    return {
      instance: function () {
        var answers = {};
        return {
          getAnswers: function () {
            return answers;
          },
          setAnswers: function (ans) {
            answers = ans;
          },        setAnswer: function (answer) {
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
      }
    };
  })
  .factory('Answers', function (AnswersFactory) {
    return AnswersFactory.instance();
  });
