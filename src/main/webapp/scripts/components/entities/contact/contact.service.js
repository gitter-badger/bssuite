'use strict';

angular.module('bssuiteApp')
    .factory('Contact', function ($resource, DateUtils) {
        return $resource('api/contacts/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
