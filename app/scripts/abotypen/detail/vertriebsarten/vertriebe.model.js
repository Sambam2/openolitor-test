'use strict';

/**
 */
angular.module('openolitor-admin')
  .factory('VertriebeListModel', function($resource, appConfig) {
    return $resource(appConfig.get().API_URL + 'abotypen/:abotypId/vertriebe/:id', {
      id: '@id',
      abotypId: '@abotypId'
    });
  });
