'use strict';

angular
  .module('ossCafeApp')
  .directive('breadcrumbs', function () {
    return {
      templateUrl: 'views/breadcrumbs.html'
    };
  });
