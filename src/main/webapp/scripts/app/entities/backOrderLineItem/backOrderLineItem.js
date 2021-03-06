'use strict';

angular.module('bssuiteApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('backOrderLineItem', {
                parent: 'entity',
                url: '/backOrderLineItems',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'BackOrderLineItems'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/backOrderLineItem/backOrderLineItems.html',
                        controller: 'BackOrderLineItemController'
                    }
                },
                resolve: {
                }
            })
            .state('backOrderLineItem.detail', {
                parent: 'entity',
                url: '/backOrderLineItem/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'BackOrderLineItem'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/backOrderLineItem/backOrderLineItem-detail.html',
                        controller: 'BackOrderLineItemDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'BackOrderLineItem', function($stateParams, BackOrderLineItem) {
                        return BackOrderLineItem.get({id : $stateParams.id});
                    }]
                }
            })
            .state('backOrderLineItem.new', {
                parent: 'backOrderLineItem',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/backOrderLineItem/backOrderLineItem-dialog.html',
                        controller: 'BackOrderLineItemDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    isReadyToRelease: null,
                                    qtyAllocated: null,
                                    isMarkedForAutoPurchaseOrdering: null,
                                    isOnHold: null,
                                    allocatedDate: null,
                                    comment: null,
                                    isPicked: null,
                                    isMarked: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('backOrderLineItem', null, { reload: true });
                    }, function() {
                        $state.go('backOrderLineItem');
                    })
                }]
            })
            .state('backOrderLineItem.edit', {
                parent: 'backOrderLineItem',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/backOrderLineItem/backOrderLineItem-dialog.html',
                        controller: 'BackOrderLineItemDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['BackOrderLineItem', function(BackOrderLineItem) {
                                return BackOrderLineItem.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('backOrderLineItem', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
