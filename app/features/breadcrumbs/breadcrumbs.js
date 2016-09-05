'use strict';

angular
  .module('jusCafeApp')
  .directive('breadcrumbs', function () {
    return {
      templateUrl: 'features/breadcrumbs/breadcrumbs.html'
    };
  });
