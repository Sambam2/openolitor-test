'use strict';

angular.module('openolitor-admin').directive('ooOverviewfilterGeschaeftsjahre', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        selectedFunct: '&',
        select: '=?',
        disabled: '=',
        selectCurrent: '=?'
      },
      transclude: true,
      templateUrl: 'scripts/utils/overview/overviewfiltergeschaeftsjahre.controller.html',
      controller: 'OverviewfilterGeschaeftsjahreController'
    };
  }
]);
