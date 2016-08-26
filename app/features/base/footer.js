'use strict';

angular
  .module('ossCafeApp')
  .directive('footer', function () {
    return {
      templateUrl: 'features/base/footer.html'
    };
  });
