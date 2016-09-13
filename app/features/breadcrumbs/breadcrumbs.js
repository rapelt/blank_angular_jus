'use strict';

angular
  .module('breadcrumbs', [])
  .directive('breadcrumbs', function () {
    return {
      templateUrl: 'features/breadcrumbs/breadcrumbs.html'
    };
  });
