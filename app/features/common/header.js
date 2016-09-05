'use strict';

angular
  .module('jusCafeApp')
  .directive('header', function () {
    return {
      templateUrl: 'features/common/header.html'
    };
  });
