'use strict';

angular
  .module('ossCafeApp')
  .directive('breadcrumbs', function () {
    return {
      templateUrl: 'features/breadcrumbs/breadcrumbs.html'
    };
  });
