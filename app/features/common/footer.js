'use strict';

angular
  .module('ossCafeApp')
  .directive('footer', function () {
    return {
      templateUrl: 'features/common/footer.html'
    };
  });
