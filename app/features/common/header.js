'use strict';

angular
  .module('ossCafeApp')
  .directive('header', function () {
    return {
      templateUrl: 'features/common/header.html'
    };
  });
