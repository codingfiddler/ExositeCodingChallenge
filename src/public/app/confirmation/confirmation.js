'use strict';

angular.module('myApp.confirmation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/confirmation', {
    templateUrl: 'confirmation/confirmation.html',
    controller: 'ConfirmationCtrl'
  });
}])

.controller('ConfirmationCtrl', ['$scope', '$location', 'orderService', function($scope, $location, orderService) {
   $scope.init = function(){

       $scope.location = $location;
       $scope.orderService = orderService;
       $scope.product = $scope.orderService.getLastOrderedProduct();

   };

   $scope.init();
}]);