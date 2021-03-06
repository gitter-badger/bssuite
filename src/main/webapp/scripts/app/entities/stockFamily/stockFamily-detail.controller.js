'use strict';

angular.module('bssuiteApp')
    .controller('StockFamilyDetailController', function ($scope, $rootScope, $stateParams, entity, StockFamily, PriceScale) {
        $scope.stockFamily = entity;
        $scope.load = function (id) {
            StockFamily.get({id: id}, function(result) {
                $scope.stockFamily = result;
            });
        };
        $rootScope.$on('bssuiteApp:stockFamilyUpdate', function(event, result) {
            $scope.stockFamily = result;
        });
    });
