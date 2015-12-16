'use strict';

/**
 */
angular.module('openolitor')
  .controller('AbosDetailController', ['$scope', '$filter', '$routeParams', '$location', 'gettext', 'AbosDetailModel', 'AbotypenOverviewModel', 'AbotypenDetailModel', 'PersonenDetailModel', 'VERTRIEBSARTEN', function($scope, $filter, $routeParams, $location, gettext, AbosDetailModel, AbotypenOverviewModel, AbotypenDetailModel, PersonenDetailModel, VERTRIEBSARTEN) {

    $scope.VERTRIEBSARTEN = VERTRIEBSARTEN;

    var defaults = {
      model: {
        id: undefined,
        abotypId: undefined
      }
    };

    if (!$routeParams.id) {
      PersonenDetailModel.get({
        id: $routeParams.personId
      }, function(person) {
        $scope.person = person;
        $scope.abo = new AbosDetailModel(defaults.model);
        $scope.abo.personId = $scope.person.id;
      });
    } else {
      PersonenDetailModel.get({
        id: $routeParams.personId
      }, function(person) {
        $scope.person = person;
      });

      AbosDetailModel.get({
        id: $routeParams.id,
        personId: $routeParams.personId
      }, function(result) {
        $scope.abo = result;
      });
    }

    $scope.abotypen = AbotypenOverviewModel.query({
      aktiv: true
    });

    $scope.isExisting = function() {
      return angular.isDefined($scope.abo) && angular.isDefined($scope.abo.id);
    };

    $scope.save = function() {
      $scope.abo.$save(function(result) {
        if (!$scope.isExisting()) {
          $location.path('/abos/' + result.id);
        }
      });
    };

    $scope.cancel = function() {
      $location.path('/abos');
    };

    $scope.delete = function() {
      $scope.abo.$delete();
    };

    function vertriebsartLabel(vertriebsart) {
      switch (vertriebsart.typ) {
        case VERTRIEBSARTEN.DEPOTLIEFERUNG:
          return vertriebsart.typ + ' - ' + vertriebsart.depot.name;
        case VERTRIEBSARTEN.HEIMLIEFERUNG:
          return vertriebsart.typ + ' - ' + vertriebsart.tour.name;
        default:
          return vertriebsart.typ;
      }
    }

    function createPermutations(abotyp) {
      $scope.vertriebsartPermutations = [];
      angular.forEach(abotyp.vertriebsarten, function(vertriebsart) {
        $scope.vertriebsartPermutations.push({
          label: vertriebsartLabel(vertriebsart),
          vertriebsart: vertriebsart
        });
      });
    }

    $scope.$watch('abo.abotypId', function(abotypId) {
      if (abotypId) {
        AbotypenDetailModel.get({
          id: abotypId
        }, function(abotyp) {
          $scope.abotyp = abotyp;
          createPermutations($scope.abotyp);
        });
      }
    });
  }]);